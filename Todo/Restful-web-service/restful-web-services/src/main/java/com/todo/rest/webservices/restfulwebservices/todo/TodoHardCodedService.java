package com.todo.rest.webservices.restfulwebservices.todo;
import java.util.*;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
@Service
public class TodoHardCodedService {
	private static List<Todo> todos= new ArrayList<>();
	private static int Counter=0;
	
	static {
		todos.add(new Todo(++Counter,"TodoApp","Learn Piano",new Date(),false));
		todos.add(new Todo(++Counter,"TodoApp","Learn React",new Date(),false));
		todos.add(new Todo(++Counter,"TodoApp","Learn Angular",new Date(),false));
	}
	
	public List<Todo> findAll(){
		return todos;
	}
	public Todo deleteById(long id) {
		Todo todo=findById(id);
		if(todo==null) {
			return null;
		}
		if(todos.remove(todo)) {
			return todo;
		}
		return null;
	}
	public Todo save(Todo todo) {
		if(todo.getId()==-1 || todo.getId()==0) {
			todo.setId(++Counter);
			todos.add(todo);
		}
		else {
			deleteById(todo.getId());
			todos.add(todo);
		}
		return todo;
	}
	public Todo findById(long id) {
		for(Todo todo: todos) {
			if(todo.getId()==id) {
				return todo;
			}
		}
		return null;
	}
}
