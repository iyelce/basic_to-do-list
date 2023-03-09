package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ToDoList struct {
	Id     primitive.ObjectID `json:"_id,omitempty" bson:"id,omitempty"`
	Task   string             `json:"task,omitempty"`
	Status bool               `json:"status,omitempty"`
}
