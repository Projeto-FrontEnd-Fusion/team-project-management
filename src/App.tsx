
import Form from './components/Form/Form'

function App() {

  return (
    <>
    <main className="min-h-screen flex flex-col items-center p-12">
      <section className="bg-neutral-900 rounded-md w-[70%] p-8 shadow-2xl">
        <h3 className="font-semibold text-xl text-white mb-8">Cadastrar novo membro</h3>
        <Form />
      </section>
    </main>
    </>
  )
}

export default App
