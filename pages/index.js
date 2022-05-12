import React from "react";
import { PlotlyChart, ReadMe, DataExplorer } from "portal";
import path from "path";
import Head from "next/head";
import { getDataset } from "../lib/dataset";
import { addView } from "../lib/utils";
import { ToggleDarkMode } from "../components/ToggleDarkMode";
import { Moon } from "phosphor-react";

const datasetsDirectory =
  process.env.PORTAL_DATASET_PATH ||
  path.join(process.cwd(), "public", "road-deaths-data");

export default function Home({ dataset, specs }) {
  if (!dataset || dataset.hasError) {
    return (
      <div className="container dark:bg-gray-900">
        <Head>
          <title>Dataset</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap"
            rel="stylesheet"
          />
        </Head>
        <h1
          data-testid="datasetTitle"
          className="m-10 text-center"
          dangerouslySetInnerHTML={{ __html: dataset.errorMsg }}
        ></h1>
      </div>
    );
  }

  const descriptor = dataset["descriptor"];
  const resources = dataset["resources"];

  return (
    <div className="dark:bg-gray-900 h-full w-full">
    <div className="container">
      <Head>
        <title>Dataset</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap"
          rel="stylesheet"
        />
      </Head>


      <section name="key-info">
        <h1 className="text-3xl font-bold p-8 dark:text-gray-400">{descriptor.title}
        <div className="flex items-center">
          <ToggleDarkMode
            description="Modo escuro"
            icon={<Moon size={21} weight="fill" />}
          />
            <span className="rounded-lg py-2 pr-2 text-sm font-normal text-gray-600 dark:bg-transparent dark:text-gray-400">
              Dark Mode{" "}
            </span>
        </div></h1>
      </section>

      <section className="m-8" name="graph">
        <h1 className="text-2xl font-bold mb-4 dark:text-gray-400">Graph</h1>
        {!specs || Object.keys(specs).length == 0 ? (
          <div>
            <h1 className="dark:text-gray-400">No graph to display</h1>
          </div>
        ) : (
          Object.values(JSON.parse(specs)).map((spec, i) => {
            if (["simple", "plotly"].includes(spec.specType)) {
              return (
                <div key={`${i}_views`}>
                  <PlotlyChart spec={spec} />
                </div>
              );
            }
          })
        )}
      </section>

      <section className="m-8 dark:text-gray-400" name="sample-table">
        <h1 className="text-2xl font-bold mb-4 dark:text-gray-400">Data Preview</h1>
        <div className="ml-3">
          <DataExplorer className="dark:text-gray-400" resources={resources} />
        </div>
      </section>

      <section name="sample-table">
        {dataset.readmeHtml != "" ? (
          <div className="dark:text-gray-400 py-4">
            <h1 className="text-2xl font-bold ml-8 dark:text-gray-400">README</h1>
            <ReadMe readme={dataset.readmeHtml} />
          </div>
        ) : (
          ""
        )}
      </section>
    </div></div>
  );
}

export async function getStaticProps() {
  const dataset = await getDataset(datasetsDirectory);

  if (dataset.hasError == true) {
    return {
      props: {
        dataset,
      },
    };
  } else {
    const datasetWithViews = addView(dataset);
    return datasetWithViews;
  }
}
