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
    if (planetInfo.mass == null)
    {
        if (planetInfo.radius >= (EARTH_RADIUS*6))
    {
        type = "Gas Giant";
        planetInfo9.style.borderColor = "red";
    }
    else if(planetInfo.radius < (EARTH_RADIUS*2))
    {
        type = "Terrestrial";
        planetInfo9.style.borderColor = "green";
    }
    else if(planetInfo.radius > (EARTH_RADIUS*3) && planetInfo.radius < (EARTH_RADIUS*6))
    {
        type = "Neptune-Like";
        planetInfo9.style.borderColor = "red";
    }
    else if(planetInfo.radius >= (EARTH_RADIUS*2) && planetInfo.radius < (EARTH_RADIUS*3))
    {
        type = "Super Earth";
        planetInfo9.style.borderColor = "green";
    }
    }

    else {
    if (planetInfo.radius >= (EARTH_RADIUS*6))
    {
        type = "Gas Giant";
        planetInfo9.style.borderColor = "red";
    }
    else if(planetInfo.radius < (EARTH_RADIUS*2))
    {
        type = "Terrestrial";
        planetInfo9.style.borderColor = "green";
    }
    else if(planetInfo.radius > (EARTH_RADIUS*2) && planetInfo.radius < (EARTH_RADIUS*6) && planetInfo.mass > (EARTH_MASS*5))
    {
        type = "Neptune-Like";
        planetInfo9.style.borderColor = "red";
    }
    else if(planetInfo.radius >= (EARTH_RADIUS*2) && planetInfo.radius < (EARTH_RADIUS*3) && planetInfo.mass < (EARTH_MASS*5))
    {
        type = "Super Earth";
        planetInfo9.style.borderColor = "green";
    }
}
    return type;
}
function checkMass(planetInfo)
{
    let planetInfo1 = document.getElementById("planetInfo1");
    if (planetInfo.mass > (EARTH_MASS*5) || planetInfo.mass < (EARTH_MASS*0.5))
    {
        planetInfo1.style.borderColor = "red";
    }
    else 
    {
        planetInfo1.style.borderColor = "green";
    }
}

function checkRadius(planetInfo)
{
    let planetInfo2 = document.getElementById("planetInfo2");
    if (planetInfo.radius > (EARTH_RADIUS*3) || planetInfo.radius < (EARTH_RADIUS*0.5))
    {
        planetInfo2.style.borderColor = "red";
    }
    else 
    {
        planetInfo2.style.borderColor = "green";
    }
}

function checkTemp(planetInfo)
{
    let planetInfo3 = document.getElementById("planetInfo3");
    if (planetInfo.temperature > (395) || planetInfo.temperature < (258))
    {
        planetInfo3.style.borderColor = "red";
    }
    else 
    {
        planetInfo3.style.borderColor = "green";
    }
}

function habitable(planetInfo)
{
    let tally = 0;
    let planetInfo3 = document.getElementById("planetInfo3");
    let planetInfo2 = document.getElementById("planetInfo2");
    let planetInfo1 = document.getElementById("planetInfo1");
    let planetInfo9 = document.getElementById("planetInfo9");
    if (planetInfo1.style.borderColor === "green")
    {
        tally += 1;
    }
    if (planetInfo2.style.borderColor === "green")
    {
        tally += 1;
    }
    if (planetInfo3.style.borderColor === "green")
    {
        tally += 1;
    }
    if (planetInfo9.style.borderColor === "green")
    {
        tally += 1;
    }
    return tally;
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
    let info10 = document.getElementById("planetInfo10");
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
    info10.style.visibility = "visible";

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
    if(habitable(planetInfo) === 0)
    {
        info10.innerHTML = "Is it Habitable: <br> Not a Chance";
    }
    else if(habitable(planetInfo) === 1)
    {
        info10.innerHTML = "Is it Habitable: <br> Very Very Little Chance";
    }
    else if(habitable(planetInfo) === 2)
    {
        info10.innerHTML = "Is it Habitable: <br> Small Chance";
    }
    else if(habitable(planetInfo) === 3)
    {
        info10.innerHTML = "Is it Habitable: <br> maybe";
    }
    else if(habitable(planetInfo) === 4)
    {
        info10.innerHTML = "Is it Habitable: <br> Good Chance";
    }
    
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
    let info10 = document.getElementById("planetInfo10");
    let planetName = document.getElementById("name");
    planetName.innerHTML = "Planet";
    info1.innerHTML = "";
    info2.innerHTML = "";
    info3.innerHTML = "";
    info4.innerHTML = "";
    info5.innerHTML = "";
    info6.innerHTML = "";
    info7.innerHTML = "";
    info8.innerHTML = "";
    info9.innerHTML = "";
    info10.innerHTML = "";
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
