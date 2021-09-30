var y = new Array(300).fill(null);
var x = Array.from(Array(300 + 1).keys()).slice(1);
  
  //CELSIUS
  // setup 
  
  console.log(x);
  const data1 = {
    labels: x.reverse(),
    datasets: [{
      label: 'Temperature Data in Celsius',
      data: y,
      backgroundColor: 'rgba(255, 26, 104, 0.2)',
      borderColor: 'rgba(255, 26, 104, 1)',
      tension: 0.5
    }]
  };

  // config 
  const config_C = {
    type: 'line',
    data: data1,
    options: {
      scales: {
        y: {
          min: 10,
          max: 50,
        },
        x:{
          min: 0,
          //max: 300,
          ticks: { 
            maxTicksLimit: 6
          }
        }
      }, 
      plugins: {
          zoom: {
              limits:{
                  y: {min: 10, max: 50}
              },
              pan:{
                  enabled: true,
                  mode: 'xy'
              },
              zoom: {
                  mode: 'xy',
                  wheel: {
                      enabled: true,
                  },
                  drag: {
                    enabled: true,
                  }

              }
          }
      }
    }
  };

  // render init block
  const myChart1 = new Chart(
    document.getElementById('myChart1'),
    config_C
  );

  
  //FARENHEIGHT
  // setup 
  const data2 = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
      'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
      'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Temperature Data in Farenheight',
        data: [100, 115, 72, 68, 77, 82, 99, 100, 115, 72, 68, 77, 82, 99, 100, 115, 72, 68, 77, 82, 99, 100, 115, 72, 68, 77, 82, 99,
          100, 115, 72, 68, 77, 82, 99, 100, 115, 72, 68, 77, 82, 99, 100, 115, 72, 68, 77, 82, 99, 100, 115, 72, 68, 77, 82, 99,],
        backgroundColor: 'rgba(255, 26, 104, 0.2)',
        borderColor: 'rgba(255, 26, 104, 1)',
        tension: 0.5
      }]
    };

    // config 
    const config_F = {
      type: 'line',
      data: data2,
      options: {
        scales: {
          y: {
            min: 50,
            max: 122,
          }
        }, 
        plugins: {
            zoom: {
                limits:{
                    y: {min: 50, max: 122}
                },
                pan:{
                    enabled: true,
                    mode: 'xy'
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    }
                }
            }
        }
      }
    };

    // render init block
    const myChart2 = new Chart(
      document.getElementById('myChart2'),
      config_F
    );


  function toFarenheight(){
      document.getElementById("chartBox1").style.display = "none";
      document.getElementById("chartBox2").style.display = "block";
  }

  function toCelsius(){
      document.getElementById("chartBox2").style.display = "none";
      document.getElementById("chartBox1").style.display = "block";
  }

document.addEventListener('DOMContentLoaded', function() { 

    const loadEl = document.querySelector('#load');

    ////////////////////////////////////////////////////////////////////
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.messaging().requestPermission().then(() => { });
    ////////////////////////////////////////////////////////////////////
    try {
        let app = firebase.app();
        let db = firebase.database();

        var db_temp = db.ref('Temp/');
        var db_time = db.ref('Time/');

        var cur_temp;
        var cur_time;

        db_time.on('value', (snapshot) => {
            cur_time = snapshot.val();

            console.log("Time:" + cur_time);
            console.log("Temp:" + cur_temp);
            y.shift();
            y.push(cur_temp);

            myChart1.update();
        });
        db_temp.on('value', (snapshot) => {
            cur_temp = snapshot.val();
        });

        let features = [
            'auth', 
            'database', 
            'firestore',
            'functions',
            'messaging', 
            'storage', 
            'analytics', 
            'remoteConfig',
            'performance',
        ].filter(feature => typeof app[feature] === 'function');
        loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;

        firebase.database().ref('/path/to/ref').on('value', snapshot => { 
            console.log('value changed');

        });

        } catch (e) {
        console.error(e);
        loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
        }
  });

  function turnOnDisplay(){
    // ws.send("HTTP:TOGGLE") NOT SURE HOW TO HANDLE THIS YET
    firebase.database().ref('ToggleDisplay/').set(1);
  } 