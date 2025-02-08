"use client";

import Button from "./components/button";  // Importación de Button
import Task from "./components/task";      // Importación de Task

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div className="contenidoPrincipal">
          <aside>
          
          </aside>

          <section>
            <h1>hola</h1>
          </section>

        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>© 2025 Tu Nombre. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
