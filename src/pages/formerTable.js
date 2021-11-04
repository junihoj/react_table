import React from 'react';
import { Router, Route } from 'react-router';
import {Sort} from '@material-ui/icons';

export default class DisplayTable extends React.Component{
    state = {
        myData: undefined,
        loading:true,
        filters:{
            text:'',
        }
    };

    async componentDidMount(){
        // const stud_id = this.props.match.params.id;

        const res = await fetch('http://127.0.0.1:8887/response.json').then((data)=>{
           return data.json();    
        }).then((data)=>{
            return data;
        });

        // console.log(res);

        this.setState({
            myData: res,
            loading:false,
        });
        
    }

    handleChange = (e)=>{
        console.log(e.target.value);
    }

    render(){
        let HTML_DATA = '';
        
        if(this.state.loading){
            HTML_DATA = <tr><td colSpan="22"><h2>Loading...</h2></td></tr>;
        }else{
            // let data = this.state.myData.slice(0,2);
            // HTML_DATA = data.map((item)=>{
            //     console.log(item);
            // });
            HTML_DATA = this.state.myData.map((item)=>(
                <tr key={item['Order ID']}>
                    <td>{item['Order ID']}</td>
                    <td>{item['Profit']}</td>
                    <td>{item['City']}</td>
                    <td>{item['Customer Name']}</td>
                    <td>{item['Product Name']}</td>
                    <td>{item['Row ID']}</td>
                    <td>{item['Country']}</td>
                    <td>{item['Discount']}</td>
                    <td>{item['Customer ID']}</td>
                    <td>{item['Region']}</td>
                    <td>{item['Quantity']}</td>
                    <td>{item['Segment']}</td>
                    <td>{item['State']}</td>
                    <td>{item['Ship Mode']}</td>
                    <td>{item['Sub-Category']}</td>
                    <td>{item['Postal Code']}</td>
                    <td>{item['Ship Date']}</td>
                    <td>{item['Category']}</td>
                    <td>{item['Product ID']}</td>
                    <td>{item['Sales']}</td>
                    <td>{item['Order Date']}</td>
                </tr>
            ));
        }

        return(
            <div className="container">
            <select onChange={this.handleChange}>
                <option value='Category'> Category</option>
                <option value="Category 2"> Category 2</option>
            </select>

            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                    <th>Order ID</th>
                    <th>Profit</th>
                    <th>City</th>
                    <th>Customer Name</th>
                    <th>Product Name</th>
                    <th>Row ID</th>
                    <th>Country</th>
                    <th>Discount</th>
                    <th>Customer ID</th>
                    <th>Region</th>
                    <th>Quantity</th>
                    <th>Segment</th>
                    <th>State</th>
                    <th>Ship Mode</th>
                    <th>Sub-Category</th>
                    <th>Postal Code</th>
                    <th>Ship Date</th>
                    <th>Category</th>
                    <th>Product ID</th>
                    <th>Sales</th>
                    <th>Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {HTML_DATA}
                </tbody>
            </table>
            </div>
        );
    }
}