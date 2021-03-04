// Working with the top ten only
let topTenCountries = data.slice(0, 10)

const margin = ({top: 0, right: 70, bottom: 0, left: 10})
const width = 600;
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
    .attr("viewBox", [0, 0, 500, 300])

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
            console.log(e)
            d3.select(this)
                .select("rect")
                .attr('fill', 'red')
            d3.select('.info-box')
                // .attr('x', e.pageX + 'px')
                // .attr('y', e.pageY + 'px')
                .attr('display', 'yes')
                .attr('transform', `translate(${e.offsetX}, ${e.offsetY})`)
            d3.select('.gdp-text')
                .text(`GDP: ${d.gdp}`)
            d3.select('.support-text')
                .text(`Support: ${d.support}`)
            d3.select('.health-text')
                .text(`Health: ${d.health}`)
            d3.select('.generosity-text')
                .text(`Generosity: ${d.generosity}`)
        })
        .on('mouseout', function (d, i) {
            d3.select(this)
                .select("rect")
                .attr('fill', 'rgb(33, 193, 231)')
                d3.select('.info-box')
                    // .attr('display', 'none')
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

    const infoBox = d3.select('g')
        .append('g')
        .attr('class', 'info-box')
        // .attr('display', 'none')
        
    infoBox.append('rect')
        .attr('width', 100)
        .attr('height', 100)
        .attr('fill', 'black')

    // Display the magnitude here
    infoBox
        .append('text')
        .text('0.0')
        .attr('fill', 'white')
        .attr('dx', 50)
        .attr('dy', 30)
        .attr('text-anchor', 'middle')
        .attr('font-size', 10)
        .attr('font-family', 'Helvetica')
        .attr('alignment-baseline', 'middle')
        .attr('class', 'gdp-text')

    infoBox
        .append('text')
        .text('0.0')
        .attr('fill', 'white')
        .attr('dx', 50)
        .attr('dy', 43)
        .attr('text-anchor', 'middle')
        .attr('font-size', 10)
        .attr('font-family', 'Helvetica')
        .attr('alignment-baseline', 'middle')
        .attr('class', 'support-text')

    infoBox
        .append('text')
        .text('0.0')
        .attr('fill', 'white')
        .attr('dx', 50)
        .attr('dy', 56)
        .attr('text-anchor', 'middle')
        .attr('font-size', 10)
        .attr('font-family', 'Helvetica')
        .attr('alignment-baseline', 'middle')
        .attr('class', 'health-text')

    infoBox
        .append('text')
        .text('0.0')
        .attr('fill', 'white')
        .attr('dx', 50)
        .attr('dy', 70)
        .attr('text-anchor', 'middle')
        .attr('font-size', 10)
        .attr('font-family', 'Helvetica')
        .attr('alignment-baseline', 'middle')
        .attr('class', 'generosity-text')
}


getTopTenCountries()