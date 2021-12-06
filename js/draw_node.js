export const drawCities = () => {
    var width = parseInt(d3.select(".container-fluid").style("width"));
    var height = 800;
    var offset = 40;
    var r = 20;
    var fontSize = r/4;

    var animation_time = 300;

    var latScale = d3.scaleLinear().domain([35.3, 35.75]).range([height, 100]);
    var lonScale = d3.scaleLinear().domain([139.6, 139.90]).range([0, width]);
    var nodeColor = d3.scaleOrdinal(d3.schemeCategory10);

    var stations = [
        "新宿", "池袋", "上野", "渋谷", "品川", "台場", "浅草", "原宿", "田町", "東京", "西日暮里",
        "みなとみらい", "横浜"
    ];

    var stationData = [];

    d3.csv("./station20210312free.csv").then(
        (data) => {
            data.forEach((d) => {
                if (stations.indexOf(d.station_name) != -1){
                    var tmp = {};
                    tmp.station_name = d.station_name
                    tmp.lat = d.lat;
                    tmp.lon = d.lon;
                    stationData.push(tmp);
                    stations = stations.filter((item) =>(item != d.station_name));
                }
            })

            // var svg = d3.select(".container-fluid").append("svg")
            // .attr("class", "w-100")
            // .style("height", height);

            var button = d3.select(".container-fluid").selectAll("circle")
            .data(stationData).enter()
            .append("button")
            .attr("type", "button")
            .attr("class", "btn m-1 position-absolute")
            .style("top", (d) => { return `${latScale(d.lat) + fontSize/4}px`;})
            .style("left", (d) => { return `${lonScale(d.lon)}px`;})
            .append("a")
            .attr("href", (d) => {return `https://www.google.co.jp/maps/search/${d.station_name} カラオケ/`;})
            .text((d) => { return d.station_name;});


            // var text = d3.select("svg").selectAll("text")
            // .data(stationData).enter().append("text")
            // .attr("text-anchor", "middle")
            // .attr("x", (d) => { return lonScale(d.lon);})
            // .attr("y", (d) => { return latScale(d.lat) + fontSize/4;})
            // .attr("font-size", "0px")
            // .attr("id", (d) => { return `text-${d.station_name}`;})
            // .text((d) => { return d.station_name;})
            // .transition().duration(animation_time)
            // .attr("font-size", `${fontSize}px`);


            // var circle = d3.select("svg").selectAll("circle")
            // .data(stationData).enter().append("circle")
            // .attr("stroke", "black")
            // .attr("fill", "transparent")
            // .attr("id", (d) => { return `circle-${d.station_name}`;})
            // .call(position)
            // .on("mouseover", (event, d) => {
            //     d3.select(`#circle-${d.station_name}`).attr("r", r * 1.5);
            //     d3.select(`#text-${d.station_name}`).attr("font-size", fontSize * 1.5)
            //     .attr("y", (d) => { return latScale(d.lat) + fontSize/2;});
            // })
            // .on("mouseout", (event, d) => {
            //     d3.select(`#circle-${d.station_name}`).attr("r", r);
            //     d3.select(`#text-${d.station_name}`).attr("font-size", fontSize)
            //     .attr("y", (d) => { return latScale(d.lat) + fontSize/4;});
            // })
            // .transition().duration(animation_time)
            // .attr("r", r);


            function position(p)
            {
              p.attr("cy", function(d){ return latScale(d.lat); });
              p.attr("cx", function(d){ return lonScale(d.lon); });
              p.attr("r", 0);
            }
        }
    )
}
