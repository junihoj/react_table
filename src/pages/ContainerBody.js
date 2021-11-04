import React from 'react';
import { DisplayTable } from './displayTable';
// import { DisplayTable } from './displayTable';


export class ContainerBody extends React.Component{

    state = {
        myData: undefined,
        loading:false,
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
            loading:true,
        });
        
    }

    render(){
        return (
            <div className="table-page-container">
                {
                    this.state.loading ? <DisplayTable data={this.state.myData} /> : 
                    <div className="loader-container">
                        <div className="loader">
                        </div>
                        <h1>Please Wait...</h1>
                    </div> 
                }
            </div>
        )
    }
}