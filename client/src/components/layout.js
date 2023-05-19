import styles from "../styles/Layout.module.css";
import Head from "next/head";
import NavBar from "./navbar";
import Menu from "./menu";
import Footer from "./footer";
import FooterLinks from "./FooterLinks";

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>H2H {title ? `| ${title}` : ""}</title>
        <meta name="description" content="H2H" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/pacto-logo.png" />
      </Head>

      <Menu />

      <NavBar />

      <div>{children}</div>

      <Footer />

      <FooterLinks />
    </>
  );
}
