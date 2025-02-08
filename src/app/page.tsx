"use client";
import Button from "./components/button";
import Task from "./components/task";
  
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">¡Bienvenido a tu nueva app de Next.js!</h1>
        <div>
          <Button contenido = {
            <>
            New Task &nbsp; 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
            </svg>

            </>
            }
            onClick={() => console.log("presionado")} />

            <Task title="Hacer deberes" description="Realizar deberes de matematicas"/>
        </div>
        <p className="text-lg">Comienza a construir tu aplicación desde aquí.</p>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>© 2025 Tu Nombre. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
