import React, {Component} from "react";
import axios from "axios";
import {Card, Header, Form, Input, Icon, Button} from "semantic-ui-react";

let endpoint="http://localhost:9000";

class ToDoList extends Component{
    constructor(props){
        super(props);

        this.state={
            task:"",
            items:[]
        };
    }
    componentDidMount(){
        this.getTask();
        
    };

    onChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value,

        });
    };
    
    //create task
    onSubmit=()=> {
        let { task } = this.state;
        console.log('Task:', task);
        if(task) {
          axios.post(
              endpoint + "/api/tasks",
              {task,},
              {headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              this.getTask();
              this.setState({
                task: "",
              });
              console.log(res.config.data);
            });
        }
    };

    //display the items as a list
    getTask=()=>{
        axios.get(endpoint+"/api/task").then((res)=>{
            if(res.data){
                this.setState({
                    items:res.data.map((item)=>{
                        let color="orange";
                        let style={wordWrap:"break-word",};
                        if(item.status){
                            color="green";
                            style["textDecorationLine"]="line-through";
                        }
                        return(
                            <Card key={item._id} color={color} fluid>
                                <Card.Content>
                                    <Card.Header textAlign="left">
                                        <div style={style}>{item.task}</div>
                                    </Card.Header>
                                    
                                    <Card.Meta textAlign="right">
                                        <Icon
                                        name="check circle"
                                        color="green"
                                        onClick={() => this.updateTask(item._id)}
                                        />
                                        <span style={{ paddingRight: 10 }}>Done</span>
                                        
                                        <Icon name="undo" color="blue"
                                        onClick={()=>this.undoTask(item._id)}/>
                                        <span style={{paddingRight:10}}>Undo</span>

                                        <Icon name="delete" color="red"
                                        onClick={()=>this.deleteTask(item._id)}/>
                                        <span style={{paddingRight:10}}>Delete</span>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        );
                    }),
                });
            }else{
                this.setState({
                    items:[],
                });
            }
        });
    };
    //complete task
    updateTask=(id)=>{
        axios.put(endpoint+"/api/task/"+id, {},
        {
            headers:{
                "Content-Type":"application/json",
            },
        }).then((res)=>{
            console.log(res);
            this.getTask();
        });
    }

    undoTask=(id)=>{
        axios.put(endpoint+"/api/undoTask/"+id, {}, {
            headers:{
                "Content-Type":"application/json",
            },
        }).then((res)=>{
            console.log(res);
            this.getTask();
        });
    };

    deleteTask=(id)=>{
        axios.delete(endpoint+"/api/deleteTask/"+id, {}, {
            headers:{
                "Content-Type":"application/json",
            },
        }).then((res)=>{
            console.log(res);
            this.getTask();
        });
    };

    render(){
        return(
            <>
                <div className="bg"></div>
                <div className="bg bg1"></div>
                <div className="bg bg2"></div>
                <div className="bg bg3"></div>
                
                    <div className="row">                        
                        <Header className="header" as="h1" color="black">
                            Idil's To-Do List
                        </Header>
                    </div>
                    <div className="row">
                        <Form onSubmit={this.onSubmit}>
                            <Input
                            className="input"
                            type="text" name="task" onChange={this.onChange}
                            value={this.state.task}
                            placeholder="Create Task"
                            />
                            <Button>Create Task</Button>
                        </Form> 
                    </div>
                    <div className="row">
                        <Card.Group>{this.state.items}</Card.Group>
                    </div>
                               
            </>
        );
    }
}

export default ToDoList;