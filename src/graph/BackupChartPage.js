import React from 'react';
import { Bar } from 'react-chartjs-2';
import DATA from '../data_model/response.json';

export class ChartPage extends React.Component{
    state={
        myData:undefined,
        data:undefined,
        options:undefined,
        loaded:false,
        selectedGraph:undefined
    }

   

    async componentDidMount(){
        const res = await fetch('http://127.0.0.1:8887/response.json').then((data)=>{
            return data.json();    
         }).then((data)=>{
             return data;
         });
 
         // console.log(res);
 
         this.setState({
             myData: res,
             loading:true,
         });

        const itembyValue = (data,groupby, column )=>{
            let groupByRegion = _.groupBy(data, groupby);
            //get the object keys
            let groupByRegionKeys = Object.keys(groupByRegion);
            //loop through the keys
            let regionByProfit = {}
            groupByRegionKeys.map(key=>{
                regionByProfit[key] = [];
                groupByRegion[key].map(keyValue=>{
                    regionByProfit[key].push(keyValue[column])
                });
            });
        
            console.log(regionByProfit);
        
            let regionByProfitsum={};
            Object.keys(regionByProfit).map(key=>{
                 regionByProfitsum[key] = regionByProfit[key].reduce((a,b)=>{
                    return Number(a) + Number(b);
                });
            });
        
            return regionByProfitsum;
        }

        const data = {
            // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
                {
                label: '# of Votes',
                data: itembyValue(data, 'Region', 'Profit'),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                },
            ],
        };
        
        const options = {
            scales: {
                yAxes: [
                {
                    ticks: {
                    beginAtZero: true,
                    },
                },
                ],
            },
        };
        this.setState({
            myData:DATA,
            data:data,
            options:options,
            loaded:true,
        });
        // if(this.state.loaded==true){
        //     console.log(this.itembyValue(this.state.myData,'Region', 'Profit')   )
        // }
       
    }


    handleChange= (e)=>{
        let selectedGraph = e.target.value;
        console.log(selectedGraph)
        this.setState({
            selectedGraph:selectedGraph
        })
    }
    
    
    render(){
        // console.log(this.state.myData);

       
        return (
            <>
            <select onChange={this.handleChange}>
                <option value="regionByProfit"> Region Sum(Profit)</option>
                <option value="regionCount">Number of Sales Each Region</option>
            </select>
        
            <div className='header'>
              <h1 className='title'>Vertical Bar Chart</h1>
              <div className='links'>
                <a
                  className='btn btn-gh'
                  href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/VerticalBar.js'
                >
                  Github Source
                </a>
              </div>
            </div>
                {this.state.loaded  && this.state.selectedGraph=='regionCount'? <Bar data={this.state.data} options={this.state.options} /> : <p>Loading ... </p> }
            
            
          </>
        )
    }
    
}

