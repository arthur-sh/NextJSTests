import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingLg}>
        <p>Hello, I'm Arthur and this is my task application.</p>
        <p>
          You can access the application by clicking{' '}
          <a href="/tasks">here</a>.
        </p>
      </section>
    </Layout>
  )
}