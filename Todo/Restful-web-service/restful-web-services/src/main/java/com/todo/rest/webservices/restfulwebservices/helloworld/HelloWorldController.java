package com.todo.rest.webservices.restfulwebservices.helloworld;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
@RestController
@CrossOrigin(origins="http://localhost:4200")
public class HelloWorldController {
		
	@RequestMapping(method=RequestMethod.GET,path="/hello-world")
	public String Helloworld() {
		return "HelloWorld";
	}
	
	@GetMapping(path="/hello-world-bean")
	public HelloWorldBean helloworldbean() {
		return new HelloWorldBean("Hello World!!");
	}
	
	@GetMapping(path="/hello-world/path-variable/{name}")
	public HelloWorldBean helloworld2(@PathVariable String name) {
		//throw new RuntimeException("Something Went Wrong!");
		return new HelloWorldBean(String.format("Hello World, %s",name));
	}
	
}
