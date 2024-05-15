import Layout from './layout/Layout'
import Navigation from './components/Navigation/Navigation'
function App() {
  return (
    <main>
      <Layout>
        <h1 className="text-3xl uppercase mt-8 font-bold">things to do</h1>
        <Navigation></Navigation>
      </Layout>
    </main>
  )
}

export default App
