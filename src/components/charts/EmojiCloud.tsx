import * as React from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
import { defaultColors } from '../../constants/colors';
import { InputCloudData } from './input-interface';
import { WordCloudController, WordElement } from 'chartjs-chart-wordcloud';

import './Cloud.css';

ChartJS.register(WordCloudController, WordElement);

const EmojiCloud = ({
  data,
  minFrequency,
  minFontSize,
  maxFontSize,
}: InputCloudData) => {
  const relevantEmojis = Object.keys(data.emojiUsage).filter(
    (emoji) => data.emojiUsage[emoji] >= minFrequency
  );

  if (relevantEmojis.length === 0) {
    return (
      <span className="text-muted">Not enough data for emoji cloud :(</span>
    );
  }

  // Determine the highest frequency
  const maxFrequency = relevantEmojis.reduce((maxFrequency, word) => {
    const frequency = data.emojiUsage[word];

    return frequency > maxFrequency ? frequency : maxFrequency;
  }, minFrequency + 1);

  // Determine the difference between the lowest and the highest frequency
  const spread = maxFrequency - minFrequency;

  const chartData = {
    labels: relevantEmojis,
    datasets: [
      {
        id: 0,
        // For each emoji usage, divide by the spread and multiply by the font size spread, add additional minimum font size.
        data: relevantEmojis.map(
          (name) =>
            (data.emojiUsage[name] / spread) * (maxFontSize - minFontSize) +
            minFontSize
        ),
        color: defaultColors,
        borderColor: defaultColors,
        backgroundColor: defaultColors,
        fit: true,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipData: any) =>
            `Found ${data.emojiUsage[tooltipData.label]}`,
        },
        color: defaultColors,
        titleFont: {
          size: 100,
        },
        padding: 12,
        displayColors: false,
      },
    },
  };

  // @ts-ignore
  return (
    <div className="cloud-container">
      <div className="cloud-wrapper">
        <Chart
          type="wordCloud"
          datasetIdKey="id"
          data={chartData}
          options={options}
        />
      </div>
    </div>
  );
};

export default EmojiCloud;
