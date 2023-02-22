import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Script from 'next/script'
import Layout from '../../components/layout'

export default function FirstPost() {
  const [google, setGoogle] = useState(null);

  if (google) {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

  }
  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2]
    ]);

    // Set chart options
    var options = {
      'title': 'How Much Pizza I Ate Last Night',
      'width': 400,
      'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }

  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
            src="https://www.gstatic.com/charts/loader.js"
            strategy="afterInteractive"
            onLoad={() => {
                console.log('chart loader loaded')
                setGoogle(window.google)
            }}
        />
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      {/* <Image
      src="/images/test.png"
      height={450}
      width={500}
      alt="Vercel Logo"
    /> */}

      <div id="chart_div"></div>
    </ Layout>
  )
}