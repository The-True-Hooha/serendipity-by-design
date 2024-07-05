---
title: "Abstractions Makes The World Go Round"
metaTitle: "man and his abstractions"
metaDesc: "how we use abstractions in every day software life applications"
socialImage: images/man-abstracted.jpeg
date: "05 July 2024"
tags:
  - Javascript
  - C++
  - compilers
  - V8
  - hardware
  - CPU
  - assembly
---

>disclaimer:  My thoughts, ideas, are half-baked. I do not wish to conform or convince the reader, as I have no rights to plunge you into the deep with me. I am but a feeble fellow, and I practice my art in my own way narrowed down with curiosity and perseverance.

## Introduction

---

This paper is not written to start another episode of a flat or round earth debate. Rather, I aim to spark a thought, and discuss what abstraction is, the pyramid of abstractions, and the price for abstraction.

Wikipedia defines Abstraction as a process wherein general rules and concepts are derived from using and classifying specific examples, literal (real or concrete) signifiers, first principles, or other methods. It also says it is the outcome of a concept that acts as a common noun for all subordinate concepts and connects any related concepts as a group, field, or category.

I had initially thought about writing this blog targeted at the software - tech-folks. But I implore you to walk with me, I will make this relatable to both code and real life. [you might find computer-related terms, abeg no vex]

 My thoughts on this topic began to take form after reading the book "A History of Western Philosophy" by Bertrand Russel, on advancing what Western civilization has taught us, and where we are now. For a moment, I urge you to pause and think, from the first men, who wrote on stones with carvings, to the first paper material "papyrus", down to our present use of computers. it can be seen clearly how the art of writing has evolved. Ask yourself, has this new form introduced a new set of super writers, or made the tradeoffs favorable? What would have been the narratives for writers like William Shakespeare, or for men like Socrates who was largely fond of teachings in the Greek square, perhaps if X existed in his time?

I like to think of abstractions as introducing new layers to a process or structure. Hidden and complicated facets can be simplified into something smaller, isolating away the important machining part of the system. For instance, should the final product of making a pen require 10 steps, it can be abstracted to require 4 - 6 steps. The easiest way to relate to abstraction can be likened to an artist or a painter. To draw the human body, you'd probably start with the head down to the legs. But with abstraction, a faster method can be introduced involving the use of certain shapes, requiring less time but with equal results.

At this point, it would resonate with you that the mind forces us to abstract with whatever we find complex. Perhaps this approach has done more damage than good, how then can we avoid the wrong abstraction? [The Wrong Abstraction by Sandi Metz](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction) highlights that
> "duplication is far cheaper than the wrong abstraction".

### The Abstraction Pyramid

The Abstraction pyramid defines the fundamental concepts on which ideas and logic evolve. The main idea, I believe is that every work should be based on concrete details that can spawn into a subset of layers at the top. For instance, a piece of text or structure that is too abstract could rather be difficult to connect with, or even hard to understand. Physical details like smell, touch, sight, or even sound evoke clear thoughts aiding the connection of abstracted ideas from conceptual beliefs or facts.

![Abstraction Pyramid](https://res.cloudinary.com/dnpwm8xgp/image/upload/v1720191996/sdb/qcnrylwxa5o0cdc2yl2r.png "abstraction pyramid")

                            image source: created by me

The abstraction pyramid can effectively explain how complex systems or base ideas are built upon. With each layer, an abstraction of the other. The higher the pyramid, the higher the number of simpler interfaces. For clarity, the pyramid can be divided into three subsets.  

- The Base Layer: Represents the primary systemic beliefs on which systems are built. They could be laws of nature or primary instincts. Newton's fundamental ideas on the laws of Motion evolved into several ways we can interact with machines or navigate the universe. From building bridges to space travel. These ideas hold the fundamental laws we obey or put into practice.
- The Middle Layer: This layer is birthed one abstraction away from the base layer. This layer serves to bridge the gap that connects the top and the base layer. More noticeable attributes include a step further into complexity, domain expansion, and newer ideologies. Each of these attributes hides the underlying truth from the surface. In Biology, tissues, and organs can be categorized as known examples of the middle layer. Socio-political systems, involve communities or institutions.
- The Top Layer: represents the most abstract of complex of systems. Here, there's a perceived high-level functionality that leverages the base layer streamlined to serve a single purpose. In his layer, behaviors can be predictable. They integrate to form cohesive bonds with the middle layer. Much more likened to non-experts or end users to interact with, because of its known simplified interface.

### The price for Abstraction

Abstractions are never free, there's always a price attached. The creator of the C++ programming language Bjarne Stroustrup: In his book Foundations of C++ said:

>In general, c++ implementations obey the zero-overhead principle: What you don't use, you don't pay for. Furthermore, what you do use, you couldn't hand code any better.

To properly put into perspective what Bjarne meant, let's go with this approach: When you visit the market, you only pay for what you have in your bag or choose to go home with. You don't have to pay for what you see, that you didn't take. So as much as in C++, what you don't use, doesn't add up for extra weights, or spikes in low system performance. Your program only compiles with what you've used, with no need to do it any better. You see, this is not the same for JavaScript, like so.  

Here's a simple example: A web server comparison in C++ and JavaScript, that implements a simple POST method to put items in a cart.

```c++
// c++ example using crow framework

#inlcude "crow.h"
#include <vector>
#include <string>
#include <chrono>

int main(){
 crow::SimpleApp app;
 std::vector<std::string> cart;

 CROW_ROUTE(app, "/add")
 .methods("POST"_method)
 ([&](const crow::request& req){
  // neglect all err handling and so
  auto start = std::chrono::high_resolution_clock::now();
  auto body = crow::json::load(req.body);
  
  std::string item = body["item"].s();
  cart.push_back(std::move(item));

  auto end = std::chrono::high_resolution_clock::now();
  std:chrono::duration<double, std::milli> duration = end - start;
  
  crow::json::wvalue res;
  res["message"] = "successful";
  res["cart_size"] = cart.size();
  res["time_taken"] = duration.count();
  
  return crow::response(res);
 });

 app.port(3030).run();
 
}
```

```js
// JavaScript example using Express

const express = require("express")
const app = express()
app.use(express.json())

let cart = []

app.post('/add', (req, res) => {
 // neglect all err handling and so
 const start = process.hrtime()
 
 const item = req.body.item
 
 cart.push(item)
 const end = process.hrtime(start)
 // convert the time to milliseconds
 const duration = (end[0] * 1e9 + end[1]) / 1e6 

 res.json({
  message: 'successful',
  cart_size: cart.length, 
  time_taken: duration
 })
})

app.listen(3000, () => console.log('Server running on port 3000'));

```

Now, let's break down what both code does, and the adoption of abstraction therein. Comparing how C++ of JavaScript might handle this task.

The code runs a simple web server in port `3030` and `3000` respectively. In the request made, the item is stored in an array, and the time taken is calculated with a response returned. Software engineers are familiar with high, low-level languages, and machine code, etc. Now let's look at this code and break it down in terms of memory management, performance, type safety, and concurrency. Recall I made attributes of the middle and top layers, and how they can be subdivided into different facets. In real-life practice, the performance or bottlenecks might not be noticeable. However, as it grows to handle more users/requests, and other complex operations one language stands out from the other. From these two code examples, the key differences are:

- C++ programs are directly compiled to run directly on the operating system, allowing for more direct access to the system's hardware.

- On the other hand, JavaScript is interpreted or JIT(Just In Time) compiled within a runtime environment(v8 Engine, Event Loop, Garbage Collector). Which is usually the browser, providing another layer of abstraction away from the hardware.
[Further examples for the price of abstraction in computer science](https://cstheory.stackexchange.com/questions/608/examples-of-the-price-of-abstraction)

The lack of abstraction can be expensive and time-consuming. You can try writing some software in Assembly to find out, or to bankers who depend on abstracted risk models for each loan application in detail.

I've spent more time in my life learning that we can always use abstractions but at a price. The greater good here is finding one whose values align well with your interests, or what you aim to achieve. This is not to disapprove those who prefer to build from scratch, a wise and thoughtful approach I must commend you. I came across something on [Hacker News](https://news.ycombinator.com/) that says, "People tend to discount the cost of all abstractions that they have internalized. Therefore when they get to a new environment, they immediately try to recreate and incorporate the abstractions that they have previously used". This largely translates to, people taking up abstractions to prevent themselves from running into bigger problems in the future, an alternate route with no effects, whose path should be taken all the time.

### Conclusion  

Abstractions evolve with time, like a parasite. It grows and studies the host environment. What would you call a good or bad abstraction, is it one which allows you to look under the hood, allowing for better optimization? That is a question only you can answer my friend. I am but a messenger, like Morpheus in the Matrix movie. I present to you to red pill, which enables you to understand what is happening inside the abstraction, or the blue pill, allowing you to only use that abstraction.

Aloha,  
David❤️

![matrix](https://res.cloudinary.com/dnpwm8xgp/image/upload/v1720191887/sdb/g2v0y7coztomlei80q10.webp "hand showing pills from the matrix movie")

## TLDR

- [The price of abstraction (repec.org)](https://ideas.repec.org/h/elg/eechap/14176_15.html)
- [Abstraction (computer science) - Wikipedia](https://en.wikipedia.org/wiki/Abstraction_(computer_science))
- [Abstractions, Idealizations, and Evolutionary Biology Peter Godfrey-Smith https://petergodfreysmith.com › PGSAbstractnId...](https://petergodfreysmith.com/PGSAbstractnIdealizn06.pdf)
- [The Evolution of Abstraction in Programming Languages - DTIC Defense Technical Information Center (.mil) https://apps.dtic.mil › sti › pdf › ADA059394](https://apps.dtic.mil/sti/tr/pdf/ADA059394.pdf)
