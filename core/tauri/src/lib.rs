// Copyright 2019-2021 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

//! Tauri is a framework for building tiny, blazing fast binaries for all major desktop platforms.
//! Developers can integrate any front-end framework that compiles to HTML, JS and CSS for building their user interface.
//! The backend of the application is a rust-sourced binary with an API that the front-end can interact with.

#![warn(missing_docs, rust_2018_idioms)]
#![cfg_attr(doc_cfg, feature(doc_cfg))]

/// The Tauri error enum.
pub use error::Error;
pub use tauri_macros::{command, generate_handler};

pub mod api;
pub(crate) mod app;
/// Async runtime.
pub mod async_runtime;
pub mod command;
/// The Tauri API endpoints.
mod endpoints;
mod error;
mod event;
mod hooks;
mod manager;
pub mod plugin;
/// Tauri window.
pub mod window;
use tauri_runtime as runtime;
/// The Tauri-specific settings for your runtime e.g. notification permission status.
pub mod settings;
mod state;
#[cfg(feature = "updater")]
pub mod updater;

#[cfg(feature = "wry")]
pub use tauri_runtime_wry::Wry;

/// `Result<T, ::tauri::Error>`
pub type Result<T> = std::result::Result<T, Error>;

/// A task to run on the main thread.
pub type SyncTask = Box<dyn FnOnce() + Send>;

use crate::{
  event::{Event, EventHandler},
  runtime::window::PendingWindow,
};
use serde::Serialize;
use std::{borrow::Borrow, collections::HashMap, sync::Arc};

// Export types likely to be used by the application.
#[cfg(any(feature = "menu", feature = "system-tray"))]
#[cfg_attr(doc_cfg, doc(cfg(any(feature = "menu", feature = "system-tray"))))]
pub use runtime::menu::CustomMenuItem;
pub use {
  self::api::assets::Assets,
  self::api::{
    config::{Config, WindowUrl},
    PackageInfo,
  },
  self::app::{App, Builder, GlobalWindowEvent},
  self::hooks::{
    Invoke, InvokeError, InvokeHandler, InvokeMessage, InvokeResolver, InvokeResponse, OnPageLoad,
    PageLoadPayload, SetupHook,
  },
  self::runtime::{
    tag::{Tag, TagRef},
    webview::{WebviewAttributes, WindowBuilder},
    window::{
      dpi::{LogicalPosition, LogicalSize, PhysicalPosition, PhysicalSize, Pixel, Position, Size},
      WindowEvent,
    },
    Icon, MenuId, Params,
  },
  self::state::{State, StateManager},
  self::window::{Monitor, Window},
};
#[cfg(feature = "system-tray")]
#[cfg_attr(doc_cfg, doc(cfg(feature = "system-tray")))]
pub use {self::app::SystemTrayEvent, self::runtime::menu::SystemTrayMenuItem};
#[cfg(feature = "menu")]
#[cfg_attr(doc_cfg, doc(cfg(feature = "menu")))]
pub use {
  self::app::WindowMenuEvent,
  self::runtime::menu::{Menu, MenuItem},
  self::window::MenuEvent,
};

/// Reads the config file at compile time and generates a [`Context`] based on its content.
///
/// The default config file path is a `tauri.conf.json` file inside the Cargo manifest directory of
/// the crate being built.
///
/// # Custom Config Path
///
/// You may pass a string literal to this macro to specify a custom path for the Tauri config file.
/// If the path is relative, it will be search for relative to the Cargo manifest of the compiling
/// crate.
///
/// # Note
///
/// This macro should not be called if you are using [`tauri-build`] to generate the context from
/// inside your build script as it will just cause excess computations that will be discarded. Use
/// either the [`tauri-build] method or this macro - not both.
///
/// [`tauri-build`]: https://docs.rs/tauri-build
pub use tauri_macros::generate_context;

/// Include a [`Context`] that was generated by [`tauri-build`] inside your build script.
///
/// You should either use [`tauri-build`] and this macro to include the compile time generated code,
/// or [`generate_context!`]. Do not use both at the same time, as they generate the same code and
/// will cause excess computations that will be discarded.
///
/// [`tauri-build`]: https://docs.rs/tauri-build
#[macro_export]
macro_rules! tauri_build_context {
  () => {
    include!(concat!(env!("OUT_DIR"), "/tauri-build-context.rs"))
  };
}

/// User supplied data required inside of a Tauri application.
///
/// # Stability
/// This is the output of the `tauri::generate_context!` macro, and is not considered part of the stable API.
/// Unless you know what you are doing and are prepared for this type to have breaking changes, do not create it yourself.
pub struct Context<A: Assets> {
  pub(crate) config: Config,
  pub(crate) assets: Arc<A>,
  pub(crate) default_window_icon: Option<Vec<u8>>,
  pub(crate) system_tray_icon: Option<Icon>,
  pub(crate) package_info: crate::api::PackageInfo,
}

impl<A: Assets> Context<A> {
  /// The config the application was prepared with.
  #[inline(always)]
  pub fn config(&self) -> &Config {
    &self.config
  }

  /// A mutable reference to the config the application was prepared with.
  #[inline(always)]
  pub fn config_mut(&mut self) -> &mut Config {
    &mut self.config
  }

  /// The assets to be served directly by Tauri.
  #[inline(always)]
  pub fn assets(&self) -> Arc<A> {
    self.assets.clone()
  }

  /// A mutable reference to the assets to be served directly by Tauri.
  #[inline(always)]
  pub fn assets_mut(&mut self) -> &mut Arc<A> {
    &mut self.assets
  }

  /// The default window icon Tauri should use when creating windows.
  #[inline(always)]
  pub fn default_window_icon(&self) -> Option<&[u8]> {
    self.default_window_icon.as_deref()
  }

  /// A mutable reference to the default window icon Tauri should use when creating windows.
  #[inline(always)]
  pub fn default_window_icon_mut(&mut self) -> &mut Option<Vec<u8>> {
    &mut self.default_window_icon
  }

  /// The icon to use on the system tray UI.
  #[inline(always)]
  pub fn system_tray_icon(&self) -> Option<&Icon> {
    self.system_tray_icon.as_ref()
  }

  /// A mutable reference to the icon to use on the system tray UI.
  #[inline(always)]
  pub fn system_tray_icon_mut(&mut self) -> &mut Option<Icon> {
    &mut self.system_tray_icon
  }

  /// Package information.
  #[inline(always)]
  pub fn package_info(&self) -> &crate::api::PackageInfo {
    &self.package_info
  }

  /// A mutable reference to the package information.
  #[inline(always)]
  pub fn package_info_mut(&mut self) -> &mut crate::api::PackageInfo {
    &mut self.package_info
  }

  /// Create a new [`Context`] from the minimal required items.
  #[inline(always)]
  pub fn new(
    config: Config,
    assets: Arc<A>,
    default_window_icon: Option<Vec<u8>>,
    system_tray_icon: Option<Icon>,
    package_info: crate::api::PackageInfo,
  ) -> Self {
    Self {
      config,
      assets,
      default_window_icon,
      system_tray_icon,
      package_info,
    }
  }
}

// TODO: expand these docs
/// Manages a running application.
pub trait Manager<P: Params>: sealed::ManagerBase<P> {
  /// The [`Config`] the manager was created with.
  fn config(&self) -> Arc<Config> {
    self.manager().config()
  }

  /// Emits a event to all windows.
  fn emit_all<E: ?Sized, S>(&self, event: &E, payload: S) -> Result<()>
  where
    P::Event: Borrow<E>,
    E: TagRef<P::Event>,
    S: Serialize + Clone,
  {
    self.manager().emit_filter(event, payload, |_| true)
  }

  /// Emits an event to a window with the specified label.
  fn emit_to<E: ?Sized, L: ?Sized, S: Serialize + Clone>(
    &self,
    label: &L,
    event: &E,
    payload: S,
  ) -> Result<()>
  where
    P::Label: Borrow<L>,
    P::Event: Borrow<E>,
    L: TagRef<P::Label>,
    E: TagRef<P::Event>,
  {
    self
      .manager()
      .emit_filter(event, payload, |w| label == w.label())
  }

  /// Listen to a global event.
  fn listen_global<E: Into<P::Event>, F>(&self, event: E, handler: F) -> EventHandler
  where
    F: Fn(Event) + Send + 'static,
  {
    self.manager().listen(event.into(), None, handler)
  }

  /// Listen to a global event only once.
  fn once_global<E: Into<P::Event>, F>(&self, event: E, handler: F) -> EventHandler
  where
    F: Fn(Event) + Send + 'static,
  {
    self.manager().once(event.into(), None, handler)
  }

  /// Trigger a global event.
  fn trigger_global<E: ?Sized>(&self, event: &E, data: Option<String>)
  where
    P::Event: Borrow<E>,
    E: TagRef<P::Event>,
  {
    self.manager().trigger(event, None, data)
  }

  /// Remove an event listener.
  fn unlisten(&self, handler_id: EventHandler) {
    self.manager().unlisten(handler_id)
  }

  /// Fetch a single window from the manager.
  fn get_window<L: ?Sized>(&self, label: &L) -> Option<Window<P>>
  where
    P::Label: Borrow<L>,
    L: TagRef<P::Label>,
  {
    self.manager().get_window(label)
  }

  /// Fetch all managed windows.
  fn windows(&self) -> HashMap<P::Label, Window<P>> {
    self.manager().windows()
  }

  /// Add `state` to the state managed by the application.
  /// See [`crate::Builder#manage`] for instructions.
  fn manage<T>(&self, state: T)
  where
    T: Send + Sync + 'static,
  {
    self.manager().state().set(state);
  }

  /// Gets the managed state for the type `T`.
  fn state<T>(&self) -> State<'_, T>
  where
    T: Send + Sync + 'static,
  {
    self.manager().inner.state.get()
  }
}

/// Prevent implementation details from leaking out of the [`Manager`] trait.
pub(crate) mod sealed {
  use crate::manager::WindowManager;
  use tauri_runtime::{Params, Runtime};

  /// A running [`Runtime`] or a dispatcher to it.
  pub enum RuntimeOrDispatch<'r, P: Params> {
    /// Reference to the running [`Runtime`].
    Runtime(&'r P::Runtime),

    /// A dispatcher to the running [`Runtime`].
    Dispatch(<P::Runtime as Runtime>::Dispatcher),
  }

  /// Managed handle to the application runtime.
  pub trait ManagerBase<P: Params> {
    /// The manager behind the [`Managed`] item.
    fn manager(&self) -> &WindowManager<P>;

    /// Creates a new [`Window`] on the [`Runtime`] and attaches it to the [`Manager`].
    fn create_new_window(
      &self,
      runtime: RuntimeOrDispatch<'_, P>,
      pending: crate::PendingWindow<P>,
    ) -> crate::Result<crate::Window<P>> {
      use crate::runtime::Dispatch;
      let labels = self.manager().labels().into_iter().collect::<Vec<_>>();
      let pending = self.manager().prepare_window(pending, &labels)?;
      match runtime {
        RuntimeOrDispatch::Runtime(runtime) => runtime.create_window(pending).map_err(Into::into),
        RuntimeOrDispatch::Dispatch(mut dispatcher) => {
          dispatcher.create_window(pending).map_err(Into::into)
        }
      }
      .map(|window| self.manager().attach_window(window))
    }
  }
}

#[cfg(test)]
mod test {
  use proptest::prelude::*;

  proptest! {
    #![proptest_config(ProptestConfig::with_cases(10000))]
    #[test]
    // check to see if spawn executes a function.
    fn check_spawn_task(task in "[a-z]+") {
      // create dummy task function
      let dummy_task = async move {
        format!("{}-run-dummy-task", task);
      };
      // call spawn
      crate::async_runtime::spawn(dummy_task);
    }
  }
}
