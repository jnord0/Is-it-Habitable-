const EARTH_TEMP = 225;
const EARTH_MASS = 0.00315;
const EARTH_RADIUS = 0.0892;
const EARTH_PH = 8.05
const EARTH_SURFACE_TEMP = 15;
//const YOUR_API_KEY = "YPYaD60PF4B3t4LnSxmJ2iGhsHqWXJhn1f3IJ7DK";
const YOUR_API_KEY = "o3DypUsg/xYdjRLyLpOiqA==h9aWfdlGu1InTVUt";

document.getElementById("enter").addEventListener("click", search);
document.getElementById("refresh").addEventListener("click", refresh);


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
    if (planetInfo.radius >= (EARTH_RADIUS*6))
    {
        type = "Gas Giant";
    }
    else if(planetInfo.radius >= (EARTH_RADIUS*0.5) && planetInfo.radius < (EARTH_RADIUS*2))
    {
        type = "Terrestrial";
    }
    else if(planetInfo.radius >= (EARTH_RADIUS*2) && planetInfo.radius < (EARTH_RADIUS*3))
    {
        type = "Super Earth";
    }
    else if(planetInfo.radius > (EARTH_RADIUS*3) && planetInfo.radius < (EARTH_RADIUS*6))
    {
        type = "Neptune-Like";
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

//getting the value of the input box


