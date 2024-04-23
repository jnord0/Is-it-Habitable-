const EARTH_TEMP = 225;
const EARTH_MASS = 0.00315;
const EARTH_RADIUS = 0.0892;
//const YOUR_API_KEY = "YPYaD60PF4B3t4LnSxmJ2iGhsHqWXJhn1f3IJ7DK";
const YOUR_API_KEY = "o3DypUsg/xYdjRLyLpOiqA==h9aWfdlGu1InTVUt";

document.getElementById("enter").addEventListener("click", search);
document.getElementById("refresh").addEventListener("click", refresh);

var search_terms = [5];

function autocompleteMatch(input) {
    if (input === '') {
        return [];
    }
    
    const reg = new RegExp(input, 'i'); // Case-insensitive regular expression
    return search_terms.filter(term => reg.test(term));
}

function showResults(val) {
    const res = document.getElementById("result");
    res.innerHTML = '';

    if (val === '') {
        return;
    }

    fetch('https://api.api-ninjas.com/v1/planets?name=' + encodeURIComponent(val), {
        headers: {
            'X-Api-Key': YOUR_API_KEY
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let list = '';
        if (data && data.length > 0) {
            for (let i = 0; i < Math.min(3, data.length); i++) {
                list += '<li>' + data[i].name + '</li>';
            }
        } else {
            list += '<li>Planet not found</li>';
        }
        res.innerHTML = '<ul>' + list + '</ul>';
    })
    .catch(error => {
        console.error('Error:', error);
        res.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const resultList = document.getElementById('result');

    resultList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            const inputTXT = document.getElementById('planet');
            const other = event.target.textContent;
            inputTXT.value = other;
        }
    });
});

function getInput()
{
    let planet = document.getElementById("planet").value;
    return planet;
} 

async function search(e) {
    e.preventDefault(); 
    let input = document.getElementById("planet").value;
    input.value = "";
    let planet = getInput();
    try {
        const response = await $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/planets?name=' + encodeURIComponent(planet),
            headers: { 'X-Api-Key': YOUR_API_KEY },
            contentType: 'application/json'
        });

        console.log(response);

        if (response && response.length > 0) {
            const planetInfo = response[0];
            display(planetInfo);
            findTwin(planetInfo);
        } else {
            console.error('Planet not found');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function planetType(planetInfo)
{
    let type = "";
    if (planetInfo.radius >= (EARTH_RADIUS*6))
    {
        type = "Gas Giant";
    }
    else if(planetInfo.radius < (EARTH_RADIUS*2))
    {
        type = "Terrestrial";
    }
    else if(planetInfo.radius >= (EARTH_RADIUS*2) && planetInfo.radius < (EARTH_RADIUS*3))
    {
        type = "Super Earth";
    }
    else if(planetInfo.radius > (EARTH_RADIUS*2) && planetInfo.radius < (EARTH_RADIUS*6) )
    {
        type = "Neptune-Like";
    }
    return type;
}
function checkMass(planetInfo)
{
    let planetInfo1 = document.getElementById("planetInfo1");
    
}

function checkRadius(planetInfo)
{
    let planetInfo2 = document.getElementById("planetInfo2");
    
}

function checkTemp(planetInfo)
{
    let planetInfo3 = document.getElementById("planetInfo3");
    
}

async function callingApi(planetName)
{
    try {
        const response = await $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/planets?name=' + encodeURIComponent(planetName),
            headers: { 'X-Api-Key': YOUR_API_KEY },
            contentType: 'application/json'
        });

        console.log(response);

        if (response && response.length > 0) {
            const planetInformation = response[0];
            return planetInformation;
        } else {
            console.error('Planet not found');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function findTwin(planetInfo) {
    let type = planetType(planetInfo);
    let planetName = "";
    let counter = 1;
    let mercury = 0; let venus = 0; let earth = 0; let mars = 0; let jupiter = 0;
    let saturn = 0; let uranus = 0; let neptune = 0;
    let twinPlanet = "";

    async function findingInfo(twinPlanet)
{
    try {
        console.log(twinPlanet);
        const response = await $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/planets?name=' + encodeURIComponent(twinPlanet),
            headers: { 'X-Api-Key': YOUR_API_KEY },
            contentType: 'application/json'
        });

        console.log(response);

        if (response && response.length > 0) {
            const planetInfoStuff = response[0];
            displayTwin(planetInfoStuff);
        } else {
            console.error('Planet not found');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

    if (type == "Neptune-Like")
    {
        let planets = ["uranus", "neptune"];
        let minDiff = Infinity;
    
        for (let planetName of planets) {
            let planetInformation = await callingApi(planetName);
            let totalDiff = Math.abs(planetInfo.mass - planetInformation.mass) +
                            Math.abs(planetInfo.radius - planetInformation.radius) +
                            Math.abs(planetInfo.temperature - planetInformation.temperature) +
                            Math.abs(planetInfo.period - planetInformation.period);
    
            if (totalDiff < minDiff) {
                minDiff = totalDiff;
                twinPlanet = planetName;
            }
        }
    }

    else if(type == "Super Earth" || type == "Terrestrial")
    {
        let planets = ["mercury", "venus", "earth", "mars"];
        let minDiff = Infinity;
    
        for (let planetName of planets) {
            let planetInformation = await callingApi(planetName);
            let totalDiff = Math.abs(planetInfo.mass - planetInformation.mass) +
                            Math.abs(planetInfo.radius - planetInformation.radius) +
                            Math.abs(planetInfo.temperature - planetInformation.temperature) +
                            Math.abs(planetInfo.period - planetInformation.period);
    
            if (totalDiff < minDiff) {
                minDiff = totalDiff;
                twinPlanet = planetName;
            }
        }
    }

    else if(type == "Gas Giant")
    {
        let planets = ["jupiter", "saturn"];
        let minDiff = Infinity;
    
        for (let planetName of planets) {
            let planetInformation = await callingApi(planetName);
            let totalDiff = Math.abs(planetInfo.mass - planetInformation.mass) +
                            Math.abs(planetInfo.radius - planetInformation.radius) +
                            Math.abs(planetInfo.temperature - planetInformation.temperature) +
                            Math.abs(planetInfo.period - planetInformation.period);
    
            if (totalDiff < minDiff) {
                minDiff = totalDiff;
                twinPlanet = planetName;
            }
        }
    }
    console.log(twinPlanet);
    findingInfo(twinPlanet);
}



function displayTwin(planetInfoStuff)
{
    let info1 = document.getElementById("solarInfo1");
    let info2 = document.getElementById("solarInfo2");
    let info3 = document.getElementById("solarInfo3");
    let info4 = document.getElementById("solarInfo4");
    let info5 = document.getElementById("solarInfo5");
    let info6 = document.getElementById("solarInfo6");
    let info7 = document.getElementById("solarInfo7");
    let info8 = document.getElementById("solarInfo8");
    let info9 = document.getElementById("solarInfo9");
    let planetName = document.getElementById("earthName");

    info1.style.visibility = "visible";
    info2.style.visibility = "visible";
    info3.style.visibility = "visible";
    info4.style.visibility = "visible";
    info5.style.visibility = "visible";
    info6.style.visibility = "visible";
    info7.style.visibility = "visible";
    info8.style.visibility = "visible";
    info9.style.visibility = "visible";

    let image = document.getElementsByClassName("left-side")[0];
    let imageName = planetInfoStuff.name + ".jpeg";
    image.style.backgroundImage = "url('./assets/" + imageName + "')";

    planetName.innerHTML = `${planetInfoStuff.name}`;
    info1.innerHTML = "Mass (Jupiters): <br>" + `${planetInfoStuff.mass}`;
    info2.innerHTML = "Radius (Jupiters): <br>" + `${planetInfoStuff.radius}`;
    info3.innerHTML = "Average Surface Temp(Kelvin): <br> " + `${planetInfoStuff.temperature}`;
    info4.innerHTML = "Orbital Period (Days): <br>" + `${planetInfoStuff.period}`;
    info5.innerHTML = "Distance from Earth (Light Years): <br>" + `${planetInfoStuff.distance_light_year}`;
    info6.innerHTML = "Semi Major Axis (AU): <br>" + `${planetInfoStuff.semi_major_axis}`;
    info7.innerHTML = "Host Star Temp(Kelvin): <br>" + `${planetInfoStuff.host_star_temperature}`;
    info8.innerHTML = "Host Star Mass (Sun): <br>" + `${planetInfoStuff.host_star_mass}`;
    info9.innerHTML = "Type of Planet: <br>" + `${planetType(planetInfoStuff)}`;
}

function display(planetInfo)
{
    let info1 = document.getElementById("planetInfo1");
    let info2 = document.getElementById("planetInfo2");
    let info3 = document.getElementById("planetInfo3");
    let info4 = document.getElementById("planetInfo4");
    let info5 = document.getElementById("planetInfo5");
    let info6 = document.getElementById("planetInfo6");
    let info7 = document.getElementById("planetInfo7");
    let info8 = document.getElementById("planetInfo8");
    let info9 = document.getElementById("planetInfo9");
    let planetName = document.getElementById("name");

    info1.style.visibility = "visible";
    info2.style.visibility = "visible";
    info3.style.visibility = "visible";
    info4.style.visibility = "visible";
    info5.style.visibility = "visible";
    info6.style.visibility = "visible";
    info7.style.visibility = "visible";
    info8.style.visibility = "visible";
    info9.style.visibility = "visible";

    planetName.innerHTML = `${planetInfo.name}`;
    info1.innerHTML = "Mass (Jupiters): <br>" + `${planetInfo.mass}`;
    info2.innerHTML = "Radius (Jupiters): <br>" + `${planetInfo.radius}`;
    info3.innerHTML = "Average Surface Temp(Kelvin): <br> " + `${planetInfo.temperature}`;
    info4.innerHTML = "Orbital Period (Days): <br>" + `${planetInfo.period}`;
    info5.innerHTML = "Distance from Earth (Light Years): <br>" + `${planetInfo.distance_light_year}`;
    info6.innerHTML = "Semi Major Axis (AU): <br>" + `${planetInfo.semi_major_axis}`;
    info7.innerHTML = "Host Star Temp(Kelvin): <br>" + `${planetInfo.host_star_temperature}`;
    info8.innerHTML = "Host Star Mass (Sun): <br>" + `${planetInfo.host_star_mass}`;
    info9.innerHTML = "Type of Planet: <br>" + `${planetType(planetInfo)}`;
    checkMass(planetInfo);
    checkRadius(planetInfo);
    checkTemp(planetInfo);
}

function clearPlanetInfo()
{
    let info1 = document.getElementById("planetInfo1");
    let info2 = document.getElementById("planetInfo2");
    let info3 = document.getElementById("planetInfo3");
    let info4 = document.getElementById("planetInfo4");
    let info5 = document.getElementById("planetInfo5");
    let info6 = document.getElementById("planetInfo6");
    let info7 = document.getElementById("planetInfo7");
    let info8 = document.getElementById("planetInfo8");
    let info9 = document.getElementById("planetInfo9");
    let otherInfo1 = document.getElementById("earthInfo1");
    let otherInfo2 = document.getElementById("earthInfo2");
    let otherInfo3 = document.getElementById("earthInfo3");
    let otherInfo4 = document.getElementById("earthInfo4");
    let otherInfo5 = document.getElementById("earthInfo5");
    let otherInfo6 = document.getElementById("earthInfo6");
    let otherInfo7 = document.getElementById("earthInfo7");
    let otherInfo8 = document.getElementById("earthInfo8");
    let otherInfo9 = document.getElementById("earthInfo9");
    planetName.innerHTML = "Planet";
    otherInfo1.innerHTML = "";
    otherInfo2.innerHTML = "";
    otherInfo3.innerHTML = "";
    otherInfo4.innerHTML = "";
    otherInfo5.innerHTML = "";
    otherInfo6.innerHTML = "";
    otherInfo7.innerHTML = "";
    otherInfo8.innerHTML = "";
    otherInfo9.innerHTML = "";
    info1.innerHTML = "";
    info2.innerHTML = "";
    info3.innerHTML = "";
    info4.innerHTML = "";
    info5.innerHTML = "";
    info6.innerHTML = "";
    info7.innerHTML = "";
    info8.innerHTML = "";
    info9.innerHTML = "";
}

async function refresh()
{
    try 
    {
        clearPlanetInfo();
    } catch (error) 
    {
      //giving error
      console.error('Error refreshing feed:', error);
    }
}
