// Working with the top ten only
let topTenCountries = data.slice(0, 10)

const margin = ({top: 0, right: 70, bottom: 0, left: 10})
const width = 500;
let height = 10 * (10 + 2)+ margin.bottom;

function sortByProperty(data, property) {
  return data
    .sort((a, b) => {
      if (a[property] > b[property] || b[property] == undefined ) {
        return 1;
      } else if (a[property] < b[property] || a[property] == undefined) {
        return -1;
      }
      return 0;
    })
}

function getTopTenCountries() {
    const xScale = d3
    .scaleLinear()
    .range([margin.left, width-margin.right])
    .domain(
        [0,10+2]
    )

    const div = d3.select('.main')

    div.append("h3")
    .text("Top Ten Ranked Countries Overall")

    const svg = div.append("svg")
    .attr("id", "topTen")
    .attr("viewBox", [0, 0, 500, 200])

    // Bars (as a whole)
    d3.select("#topTen")
    .append("g")
        .attr("id", "bars")

    const g = svg.select("#bars")
        .selectAll("g")
        .data(topTenCountries)
        .join("g")
            .attr("class", (d) => d.country)
            .attr("transform", `translate(${margin.left}, 0)`)
        .on('mouseover', function (e, d) {
            d3.select(this)
                .attr('stroke', 'blue')
            d3.select('.info-box')
                .attr('x', d3.select(this).attr('cx'))
                .attr('y', d3.select(this).attr('cy'))
                .attr('display', 'yes')
                .attr('transform', `translate(${d3.select(this).attr('cx')}, ${d3.select(this).attr('cy')})`)
            d3.select('.info-box text')
                .text(d.gdp, d.support, d.health, d.generosity)
        })
        .on('mouseout', function (d, i) {
            d3.select(this)
                .attr('stroke', 'none')
                d3.select('.info-box')
                    .attr('display', 'none')
        })

    // Bar graph bars
    g.append("rect")
        .attr("fill", "rgb(33, 193, 231)")
        .attr("x", 0)
        .attr("y", (_, i) => (i * (10 + 2)))
        .attr("width", (d, i) => {
            return xScale(d.score)
        })
        .attr("height", 10)

    g.append("text")
        .text((d) => `${d.rank}.  ${d.country}: ${d.score}`)
        .attr("x", 3)
        .attr("y", (_, i) => {
            return (i * (10 + 2) + 10 / 2)
            })
        .attr("dy", "0.3em")
        .attr("fill", 'white')
        .attr('font-size', '0.5em')

    const infoBox = d3.select('#svg')
        .append('g')
        .attr('class', 'info-box')
        .attr('display', 'none')

    // Make the black box 
    infoBox.append('rect')
        .attr(100, 100)
        .attr('height', 100)

    // Display the magnitude here
    infoBox
        .append('text')
        .text('0.0')
        .attr('fill', 'white')
        .attr('dx', 50)
        .attr('dy', 50)
        .attr('text-anchor', 'middle')
        .attr('font-size', 48)
        .attr('font-family', 'Helvetica')
        .attr('alignment-baseline', 'middle')
}


getTopTenCountries()