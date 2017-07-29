import CenteredSection from './CenteredSection.component';
import React, { Component } from 'react';
import Chart from 'chart.js';
const randomColor = require('randomcolor'); 

export default class PollChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options,
      ctx: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.options !== this.state.options) {
      this.setState({options: nextProps.options}, () => {
        this.drawBarChart(this.state.ctx, this.state.options);
      });
    }
  }

  componentDidMount() {
    let canvas = document.getElementById('chart');
    let ctx = canvas.getContext('2d');
    this.setState({ ctx }, () => {
      this.drawBarChart(this.state.ctx, this.state.options);
    });
  }

  drawBarChart(ctx, options) {
    let labels = options.map(option => option.label)
    let data = options.map(option => option.votes);
    let count = options.length;
    let colors = this.getRandomColors(count);
    let chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '#Votes',
          data: data,
          backgroundColor: colors.bgColors,
          borderColor: colors.borderColors,
        }]
      },
      options: {
        responseive: true,
        maintainAspectRation: false,
        layout: {
          padding: 0
        },
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
              color: '#333'
            },
            barPercentage: 1,
            categoryPercentage: 0.5,
            ticks: {
              beginAtZero: true,
              autoSkip: false,
              callback: (value, index, values) => {
                return this.shortenString(value, 20);
              }
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }],
        },
        tooltips: {
          callbacks: {
            title: function(tooltipItems, data) {
              let index = tooltipItems[0].index;
              return data.labels[index];
            }
          }
        }
      }
    });
  }

  // Shorten a string to a given limit and append ...
  shortenString(str, limit) {
    if(str.length > limit) {
      let label = str.substr(0, 20);
      label += '...';
      return label;
    }
    return str;
  }

  // Generate random colors for the chart
  getRandomColors(count) {
    let i = 0;
    let bgColors = [];
    let borderColors = [];
    while(i < count) {
      let seed = ~~((Math.random() + 1) * 100);
      // The returned color is the same for a given seed
      // Set the same color for background and border
      // but with different opacity
      bgColors.push(randomColor({
        seed,
        format: 'rgba',
        alpha: 0.5
      }));
      borderColors.push(randomColor({
        seed,
        format: 'rgba',
        alpha: 1
      }));
      i++
    }
    return { bgColors, borderColors }
  }
  render() {
    return(
      <CenteredSection>
        <canvas 
        className="hiden-xs"
        id="chart"/>
      </CenteredSection>
    )
  }
}