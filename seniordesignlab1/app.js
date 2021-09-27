  
  var y = Array.from({length: 300}, () => Math.floor(Math.random() * (40-38))+38);
  var x = Array.from(Array(300 + 1).keys()).slice(1);

  //test func - rand temp generator
  setInterval(function(){   

    var temp = Math.floor((Math.random()*(20-10))+10);
    console.log(temp); 
    y.shift();
    y.push(temp);

    myChart1.update();

  }, 1000);

  
    
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
    
