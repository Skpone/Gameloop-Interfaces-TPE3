"use strict";

let in_game = true;

    function process_user_input() {
        //procesar el input del usuario
    }

    function refresh_status() {
        // actualizar estado
    }

    function rendering() {
        // dibujar juego
    }

    function gameLoop() {
        console.log('Bucle en ejecucion.');
        process_user_input();
        refresh_status();
        rendering();

        if (in_game) {
            requestAnimationFrame(gameLoop);
        }
    }

    gameLoop();