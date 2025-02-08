"use client";
import Button from "./components/button";


export default function Home() {


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">¡Bienvenido a tu nueva app de Next.js!</h1>
        <div>
      <Button  contenido="Haz clic aquí" onClick={()=> console.log('presionado')} />
    </div>
        <p className="text-lg">Comienza a construir tu aplicación desde aquí.</p>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>© 2025 Tu Nombre. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
