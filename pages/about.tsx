import Head from "next/head";
import Link from "next/link";

const About = () => {
  return (
    <>
      <Head>
        <title>Diatonic Ruler | About</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="This website displays interactive diatonic rulers to let you explore relationships between pitch, scale degrees and positions, intervals, and more."
        />
      </Head>
      <main>
        <section className="container">
          <p>
            <Link href="/">
              <a>← Back to main page</a>
            </Link>
          </p>

          <h1>About</h1>
          <p>
            This website provides several setups (“presets”) of interactive{" "}
            <i>diatonic rulers</i> for music theory learners to explore the
            relationships among pitch, scale degrees and positions, and
            intervals that underlie concepts like keys, transposition, and more.
            The idea of the diatonic ruler expands on the Norwich Sol-Fa system
            invented by English music educator{" "}
            <a href="https://musictheoryexamplesbywomen.com/theorists/sarah-ann-glover-1786-1867/">
              Sarah Anna Glover
            </a>{" "}
            (1786–1867).
          </p>
          <p>
            This website was designed and developed in fall 2021 and IAP 2022 by{" "}
            <a href="https://katmh.com">Kat Huang</a> with{" "}
            <a href="https://nathanlam.com/">Nathan Lam</a> for MIT’s
            introductory{" "}
            <a href="https://mta.mit.edu/music/class-schedule">
              music theory courses
            </a>
            , 21M.051 and 21M.301. Also thanks to Max Wang for advice on both
            the technical implementation design and musical user experience. The
            source code of this project is available at{" "}
            <a href="https://github.com/katmh/diatonic">
              github.com/katmh/diatonic
            </a>
            . Feel free to report bugs by{" "}
            <a href="https://github.com/katmh/diatonic/issues">
              creating an issue
            </a>{" "}
            on the GitHub repository, though there are currently no contribution
            guidelines or guarantees about active maintenance.
          </p>
          <p>Enjoy!</p>
        </section>
        <style jsx>{`
          .container {
            width: 95%;
            max-width: 650px;
            margin: 0 auto;
            padding: 2rem 0;
          }

          @media (min-width: 900px) {
            .container {
              width: 90%;
            }
          }

          h1 {
            color: #222;
            font-size: 1.75rem;
            letter-spacing: -0.5px;
          }

          p {
            color: #333;
            margin: 1.25rem 0;
            line-height: 1.5;
          }
        `}</style>
      </main>
    </>
  );
};

export default About;
