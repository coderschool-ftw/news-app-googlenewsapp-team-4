# CoderSchool FTW - * The T4 News *

Created with love by: Thang, Prince, Jade
  
View online at: [the-t4-news.netlify.app]
  
One or two sentence summary of your project, anything fun that you liked.

## Video Walkthrough

Here's a walkthrough of implemented user stories.

To create a GIF, use [LiceCap](http://www.cockos.com/licecap/), [RecordIt](http://www.recordit.co), or [Loom](http://www.useloom.com), and link the image here in the markdown.

```
<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />
```

## User Stories

The following **required** functionalities are completed (this is a sample):

* [x] The user can see a list of the 20 latest top news stories, loaded dynamically from our api
* [x] For each story, the user sees a headline, the source, a link to more, and an image
* [ ] The user can see the total number of stories currently shown
* [x] The user can click a link at the bottom of the page to load the next 20 stories. The page does not refresh. 
* [x] The user can see how long ago the story was published in a human-friendly format; e.g. "15 minutes ago". 

The following **optional** features are implemented:

* [ ] The user can see a checkbox for every unique source of the articles loaded. For example, if the user loads four stories, and two stories are from bbc-news, one from cnn, and one from spiegel-de, the user would see three checkboxes: bbc-news, cnn, spiegel-de.
* [ ] Next to the source name, the user sees a number representing the number of stories from that source. To continue the previous example: bbc-news (2), cnn (1), spiegel-de (1).
* [ ] The user can toggle the checkbox to hide or show stories from that source in the list.
* [ ] The user should see new stories related to the category he/she chose.

The following **additional** features are implemented:

* [x] Render Article Title by user input (with search form and submit button)
* [x] Render Headline Articles by Default
* [x] Used regular expression to format query string 


## Time Spent and Lessons Learned

Time spent: **X** hours spent in total.

Describe any challenges encountered while building the app.

**TIME SPENT:**


**MAIN CHALLENGES:** 
* Using the Free version of newsapi.org, we almost ended up writing a function to interate over an array of api keys. SOLUTION: Change the date in "from=...." within the URL will (temporarily) help fetch data.
* This is a project that was hard to split up different components to work on independently.

**INDIVIDUAL CHALLENGE(S):**

**Thang** - Handle/Catch error when fetching the request

When trying to load the articles from 101 to 120 or more:
- The Console's Source Tab show a red cross next to the fetch function.
- The Console show there is an error with fetch.
- In Network Tab, in response object, the status property is "error", the code property is "rateLimited".

After that, when I tested the load more function too much (50 times):
- The Console's Source Tab also show a red cross next to fetch function.
- The console show a GET request with HTTP code 429 Too Many Requests.

I've been so confused with all those code: response's object code, response's HTTP code.
I tried to use try/catch to handle the latter case, but it didn't work. Although in the console, the HTTP code is show in red color and in the Source tab, there is a cross next to fetch, it's not an error for fetch, it's still a success request/respone?!?!?! Both of those case, we still receive a response object.

**Prince** - understanding the difference between "request parameter" versus "response object", and when to use which appropriately. 

**Prince & Jade** - understanding each other's code

**Jade** - In a nutshell this project was a challenge in many ways. Such as:

- Linking features: How to load more pages after user inputs a keyword, that changes the request parameter and then handle the response object/details appropriately.
  --SOLUTION: With Thang's knowledge and expertise, he was able to incorporate the search feature I created with his load more button logic.
- Attempted to add a Carousel for Headline articles: Got stuck on trying to figure out how to iterate over an array of carousel items and display it properly. The issue is not yet resolved therefore it is not included in the project here.


**LESSONS LEARNED:**
- Be open to ask each other for help as soon as any issues/problem arises.
- To use liveshare in vscode more often, for debugging or team-work sessions.


## License

    Copyright [2021] [Thang Prince Jade]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
