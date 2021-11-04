import React from 'react';
import { Bar } from 'react-chartjs-2';
import DATA from '../data_model/response.json';
import { CustomerCount } from '../graph/CustomerCount';
import { CustomerSumProfit } from '../graph/CustomerSumProfit';
import { RegionCount } from '../graph/RegionCount';
import { RegionSum } from '../graph/RegionSum';

export class ChartPage extends React.Component{
    state={
        data:undefined,
        loaded:false,
        selectedGraph:'regionByProfit'
    }

   

    async componentDidMount(){
        const res = await fetch('http://127.0.0.1:8887/response.json').then((data)=>{
            return data.json();    
         }).then((data)=>{
             return data;
         });
 
         // console.log(res);
 
         this.setState({
             data: res,
             loaded:true,
         });
       
    }

    itembyValue = (data,groupby, column )=>{
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


    Counter = (data, groupBy)=>{
        let groupByRegion = _.groupBy(data, groupBy);
    
        let groupByRegionKeys = Object.keys(groupByRegion);
    
        let regionByProfit = {}
        groupByRegionKeys.map(key=>{
            regionByProfit[key] = [];
            
            regionByProfit[key] = groupByRegion[key].length;
        });
    
        return regionByProfit;
    }

    topTen = (data, groupBy)=>{
        const topItem = {}
        const  keyValue = Object.entries(this.Counter(data,groupBy))
                    .sort((a,b)=>{
                        return a[1]<b[1]? 1: -1;
                    })
    
        keyValue.slice(0,10).map(item=>{
            topItem[item[0]] = item[1]
        })
    
        return topItem;
    }

    topTenbyValue = (data, groupBy, column)=>{
        const topItem = {}
        const  keyValue = Object.entries(this.itembyValue(data,groupBy,column))
                    .sort((a,b)=>{
                        return a[1]<b[1]? 1: -1;
                    })
    
        keyValue.slice(0,10).map(item=>{
            topItem[item[0]] = item[1]
        })
    
        return topItem;
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
                <option value="customerPurchaseCount"> Number of Purchase Made by a Customer</option>
                <option value="customerProfitSum">Top Ten Customer based on Profit</option>
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
                 {/*{this.state.loaded  && this.state.selectedGraph=='regionCount'? <Bar data={this.state.data} options={this.state.options} /> : <p>Loading ... </p> } */}
                {this.state.loaded  && this.state.selectedGraph=='regionByProfit'?
                     <RegionSum data={this.state.data} handleFunction={this.itembyValue} /> :
                      <p>Loading ... </p>
                }
                {(this.state.loaded  && this.state.selectedGraph=='regionCount') &&
                     <RegionCount data={this.state.data} handleFunction={this.Counter} /> 
                }

                {(this.state.loaded  && this.state.selectedGraph=='customerPurchaseCount') &&
                    <CustomerCount data={this.state.data} handleFunction={this.topTen} /> 
                }
                {(this.state.loaded  && this.state.selectedGraph=='customerProfitSum') &&
                    <CustomerSumProfit data={this.state.data} handleFunction={this.topTenbyValue} /> 
                }
            
          </>
        )
    }
    
}

