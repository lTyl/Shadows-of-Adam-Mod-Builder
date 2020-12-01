(function () {
	
	Menu.prototype.inputSelectUpdate = (function() {
		return function() {
			// Go to previous menu or back to field state
			if ( ig.input.pressed('back')) {
				//ig.global.soa.Sounds.back.play();
				if ( this.menuState == 2 ) {
					this.menuState = 0;
					this.highlight2.visible = false;
					var newPos = this.getCursorPosition();
					this._cursorTweenToPosition( newPos.x, newPos.y, ig.global.Config.Settings.MENU_CURSOR_TWEEN_TIME );
					return;
				}
				this.menuState -= 1;
				if ( this.menuState < 0 ) {
					ig.global.audioManager.playSound('ui_back');
					ig.system.setGame(FieldState);
				}
				var newPos = this.getCursorPosition();
				this._cursorTweenToPosition( newPos.x, newPos.y, ig.global.Config.Settings.MENU_CURSOR_TWEEN_TIME );
			}

			if (ig.input.pressed('enter')) {
				// log last action
				ig.global.lastMenuAction = this.choice;


				if (this.choice == 0) {
					ig.scene.set(ItemMenu, {map: this.map});
					//ig.system.setGame(ItemMenu);
					this.changed = 1;
					ig.global.audioManager.playSound('ui_confirm');

				}
				else if (this.choice == 1) {
					if (this.menuState == 1) {
						ig.scene.set(EquipMenu, {map: this.map});
						//ig.system.setGame(EquipMenu);
						this.changed = 1;
						ig.global.menuActor = this.choice2;
						ig.global.audioManager.playSound('ui_confirm');

					}
					else {
						this.menuState = 1;
						this.choice2 = 0;
						var newPos = this.getCursorPosition();
						this._cursorTweenToPosition( newPos.x, newPos.y, ig.global.Config.Settings.MENU_CURSOR_TWEEN_TIME );
						ig.global.audioManager.playSound('ui_confirm');

					}
				}
				else if (this.choice == 2) {
					if (this.menuState == 1) {
						ig.scene.set(InfoMenu, {map: this.map});
						//ig.system.setGame(InfoMenu);
						this.changed = 1;
						ig.global.menuActor = this.choice2;
						ig.global.audioManager.playSound('ui_confirm');

					}
					else {
						this.menuState = 1;
						this.choice2 = 0;
						var newPos = this.getCursorPosition();
						this._cursorTweenToPosition( newPos.x, newPos.y, ig.global.Config.Settings.MENU_CURSOR_TWEEN_TIME );
						ig.global.audioManager.playSound('ui_confirm');

					}
				}
				else if (this.choice == 3) {
					if (this.menuState == 1) {
						if (ig.global.heroes.list[this.availableActors[this.choice2]].hp > 0) {
							ig.scene.set(CastMenu, {map: this.map});
							//ig.system.setGame(CastMenu);
							this.changed = 1;
							ig.global.menuActor = this.choice2;
							ig.global.audioManager.playSound('ui_confirm');

						}
						else {
							ig.global.audioManager.playSound('ui_error');
							//this.failSound.play();
						}

					}
					else {
						this.menuState = 1;
						this.choice2 = 0;
						var newPos = this.getCursorPosition();
						this._cursorTweenToPosition( newPos.x, newPos.y, ig.global.Config.Settings.MENU_CURSOR_TWEEN_TIME );
						ig.global.audioManager.playSound('ui_confirm');

					}
				}
				else if (this.choice == 4) {
					ig.global.saveState = 'save';
					ig.scene.set(SaveMenu, {map: this.map});
					ig.global.audioManager.playSound('ui_confirm');

					//ig.system.setGame(SaveMenu);
				}
				else if (this.choice == 5) {
					ig.scene.set(ConfigState, {map: this.map, lastState: 'field'});
					//ig.system.setGame(SaveMenu);
				}
				else if ( this.choice == 6 ) {
					if ( this.menuState == 0 ){
						this.highlight2.visible = true;
						this.menuState = 2;
						ig.global.audioManager.playSound('ui_confirm');
					} else if ( this.menuState == 2 && this.exitGameChoice == 0 ) {
						// Go to title screen
						//this.goToTitle();
						this.menuState = 3;
						ig.global.audioManager.playSound('ui_confirm');
					}
					else if ( this.menuState == 2 && this.exitGameChoice == 1 ) {
						if ( ig.global.Config.Settings.BINARY_BUILD ){
							// Binary build is enabled. We can select.
							ig.global.audioManager.playSound('ui_confirm');
							this.menuState = 3;
							//this.goToDesktop();
						} else {
							ig.global.audioManager.playSound('ui_error');
						}
					}
					else if ( this.menuState == 2 && this.exitGameChoice == 2 ){
						// Go back to menu
						this.menuState = 0;
						this.highlight2.visible = false;
						ig.global.audioManager.playSound('ui_confirm');
					}
					else if ( this.menuState == 3 && this.exitGameChoice == 0 && this.exitGameChoiceConfirm == 0 ) {
						// Confirm choice. Go back to title
						ig.global.audioManager.playSound('ui_confirm');
						ig.music.fadeOut( 0.5 );
						ig.game.startScreenFade(0.5, this, "goToTitle");
					} else if ( this.menuState == 3 && this.exitGameChoice == 1 && this.exitGameChoiceConfirm == 0 ) {
						// Confirm choice. Go to desktop.
						ig.global.audioManager.playSound('ui_confirm');
						ig.music.fadeOut( 0.5 );
						ig.game.startScreenFade(0.5, this, "goToDesktop");
					} else if ( this.menuState == 3 && this.exitGameChoice == 0 && this.exitGameChoiceConfirm == 1 ) {
						// Do not confirm.
						ig.global.audioManager.playSound('ui_confirm');
						this.menuState = 2;
					} else if ( this.menuState == 3 && this.exitGameChoice == 1 && this.exitGameChoiceConfirm == 1 ) {
						// Do not confirm
						ig.global.audioManager.playSound('ui_confirm');
						this.menuState = 2;
					}
					var newPos = this.getCursorPosition();
					this._cursorTweenToPosition( newPos.x, newPos.y, ig.global.Config.Settings.MENU_CURSOR_TWEEN_TIME );
				}
				else {
					ig.global.audioManager.playSound('ui_error');
				}
			}

			if (this.timer.delta() > .15) { // controls cursor delay on main menu and hero select on main menu from abilities choice
				if (this.menuState == 0) {
					if (ig.input.state('down')) {
						this.choice += 1;
						ig.global.audioManager.playSound('ui_movement');
						this.timer.reset();
						if (this.choice > 6) {
							this.choice = 0;
						}
						var newPos = this.getCursorPosition();
						this._cursorTweenToPosition( newPos.x, newPos.y, ig.global.Config.Settings.MENU_CURSOR_TWEEN_TIME );
					}
					else if (ig.input.state('up')) {
						this.choice -= 1;
						ig.global.audioManager.playSound('ui_movement');
						this.timer.reset();
						if (this.choice < 0) {
							this.choice = 6;
						}
						var newPos = this.getCursorPosition();
						this._cursorTweenToPosition( newPos.x, newPos.y, ig.global.Config.Settings.MENU_CURSOR_TWEEN_TIME );
					}
				}
				else if (this.menuState == 1) {
					if (ig.input.state('down')) {
						this.choice2 += 1;
						if(this.choice2 > this.availableActors.length - 1) {
							this.choice2 = 0;
						}
						ig.global.audioManager.playSound('ui_movement');
						this.timer.reset();
						var newPos = this.getCursorPosition();
						this._cursorTweenToPosition( newPos.x, newPos.y, ig.global.Config.Settings.MENU_CURSOR_TWEEN_TIME );
					}
					else if (ig.input.state('up')) {
						this.choice2 -= 1;

						if(this.choice2 <= -1) {
							this.choice2 = this.availableActors.length - 1;
						}

						ig.global.audioManager.playSound('ui_movement');
						this.timer.reset();
						var newPos = this.getCursorPosition();
						this._cursorTweenToPosition( newPos.x, newPos.y, ig.global.Config.Settings.MENU_CURSOR_TWEEN_TIME );
					}
					/*else if (ig.input.state('up') && this.choice2 >= 2) {
					 this.choice2 -= 2;
					 ig.global.soa.Sounds.cursor.play();
					 this.timer.reset();
					 }
					 else if (ig.input.state('down') && this.choice2 < 2) {
					 this.choice2 += 2;
					 ig.global.soa.Sounds.cursor.play();
					 this.timer.reset();
					 }*/
				}
				else if ( this.menuState == 2 ) {
					if ( ig.input.state('down') ) {
						ig.global.audioManager.playSound('ui_movement');
						this.exitGameChoice++;
						this.timer.reset();
						if ( this.exitGameChoice > 2 )
							this.exitGameChoice = 0;
						var newPos = this.getCursorPosition();
						this._cursorTweenToPosition( newPos.x, newPos.y, ig.global.Config.Settings.MENU_CURSOR_TWEEN_TIME );
					}

					if ( ig.input.state('up') ) {
						ig.global.audioManager.playSound('ui_movement');
						this.exitGameChoice--;
						this.timer.reset();
						if ( this.exitGameChoice < 0 )
							this.exitGameChoice = 2;
						var newPos = this.getCursorPosition();
						this._cursorTweenToPosition( newPos.x, newPos.y, ig.global.Config.Settings.MENU_CURSOR_TWEEN_TIME );
					}
				}
				else if ( this.menuState == 3 ) {
					if ( ig.input.state('down') ) {
						ig.global.audioManager.playSound('ui_movement');
						this.exitGameChoiceConfirm++;
						this.timer.reset();
						if ( this.exitGameChoiceConfirm > 1 )
							this.exitGameChoiceConfirm = 0;
						var newPos = this.getCursorPosition();
						this._cursorTweenToPosition( newPos.x, newPos.y, ig.global.Config.Settings.MENU_CURSOR_TWEEN_TIME );
					}

					if ( ig.input.state('up') ) {
						ig.global.audioManager.playSound('ui_movement');
						this.exitGameChoiceConfirm--;
						this.timer.reset();
						if ( this.exitGameChoiceConfirm < 0 )
							this.exitGameChoiceConfirm = 1;
						var newPos = this.getCursorPosition();
						this._cursorTweenToPosition( newPos.x, newPos.y, ig.global.Config.Settings.MENU_CURSOR_TWEEN_TIME );
					}
				}
			}
		};
	})();
	

	console.log("Mod: 'Faster Main Menu' applied!");
})();