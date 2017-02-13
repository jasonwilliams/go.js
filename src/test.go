package main

import "fmt"

type myObj struct {
	mode   string
	trace  bool // == (mode & Trace != 0)
	indent int  // indentation used for tracing output
}

func main() {
	var jase string = "hello"
	// fmt.Println(jase)
}
