var y_C = new Array(300).fill(null);
var y_F = new Array(300).fill(null);
var x = Array.from(Array(300 + 1).keys()).slice(1);
  
  //CELSIUS
  // setup 
  
  console.log(x);
  const data1 = {
    labels: x.reverse(),
    datasets: [{
      label: 'Temperature Data in Celsius',
      data: y_C,
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
                reverse: true,
                maxTicksLimit: 6,
                stepSize: 50
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
                      mode: 'y',
                      limits:{
                        y:{min: 10, max: 50}
                      }
                  },
                  zoom: {
                      mode: 'y',
                      wheel: {
                          enabled: true,
                      },
                      drag: {
                        enabled: false,
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
        labels: x,
        datasets: [{
          label: 'Temperature Data in Fahrenheit',
          data: y_F,
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
              },
              x:{
                min: 0,
                //max: 300,
                ticks: { 
                  reverse: true,
                  maxTicksLimit: 6
                }
              }
            }, 
            plugins: {
              zoom: {
                  limits:{
                      y: {min: 50, max: 122}
                  },
                  pan:{
                      enabled: true,
                      mode: 'y',
                      limits:{
                        y:{min: 50, max: 122}
                      }
                  },
                  zoom: {
                      mode: 'y',
                      wheel: {
                          enabled: true,
                      },
                      drag: {
                        enabled: false,
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
  
var cur_time;

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

        // first, update the y array to contain the real data from firebase
        var PrevTemps = db.ref().child('PreviousTemps');
        PrevTemps.once('value', function(snap){
          snap.forEach(function(item){
            var itemVal = item.val();
            y_C.shift();
            y_C.push(itemVal);
            
            itemVal = (1.8 * itemVal) + 32;
            y_F.shift();
            y_F.push(itemVal);          

          });
        });

        var db_temp = db.ref('Temp/');
        var db_time = db.ref('Time/');

        var cur_temp;
        var cur_time;
        var has_alerted = false;

        db_time.on('value', (snapshot) => {
            cur_time = snapshot.val();

            if(cur_temp == -127 && !has_alerted){
              alert("Sensor Unplugged or Damaged!");
              has_alerted = true;
            }
            else if(cur_temp != -127){
              has_alerted = false;
              console.log("Time:" + cur_time);
              console.log("Temp:" + cur_temp);
              y_C.shift();
              y_C.push(cur_temp);
              myChart1.update();

              cur_temp = (1.8 * cur_temp) + 32;
              y_F.shift();
              y_F.push(cur_temp);
              myChart2.update();
            }
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