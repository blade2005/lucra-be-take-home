<!--
Describe implementation below.

Feel free to add any relevant info on what packages you may have added, the directory structure you chose, the tests you added etc. Is there anything you would have done differently with more time and or resources?
-->

I started by getting yarn setup and checking that nvm was using the correct version.

Added some unit tests for the service layer so I'm testing as close to what I'm writing as possible.

Most of the work needed to happen in the service layer rather than in the controller's. 

I'd have liked to have done a integration test for the service layer so I could ensure the data was what I expected. I ended up doing the testing of the data structures with the e2e test, which I don't like doing as it requires a lot more infrastructure and setup than testing just the services.

As part of randomizing the mine, I could have set up a function to randomly select but I feel like the isolation of `makeCell` is fine for now. I took the approach of a random int with a threshold, I also considered a modulous.

I made the threshold const and placed it in a new file so it's easier to see where it's coming from.

I feel like the functions I put in the game service don't really belong there and I'd probably move them out into a new file.

With a repo/service/controller layout, I'd also add a deeper structure for each controller and service, so it would become `src/controllers/games/games.controller.ts` and `src/services/games/games.service.ts`.

The more I think about it after writing it out, is that I'd move the extra functions into their own `gameCells.service.ts` and import it. Due to the close nature I wouldn't create a `create` function on that service, but have it mostly serve to create cells, it would also be nice way to encapsulate the logic for the adjacent mines.

Most likely in the future would add filtering to the list of all games, to get them by status, most likely via query params instead of path params. 

Implementing the neighboring bomb count, could be brute forced by doing adjecent lookups in off by one of up and down since I created them using arrays, however I feel like that strategy isn't great long term and rather than implementing something that isn't sustainable I opted to skip it. I'm certain there's a better option than 8 lookups per row/cell.

I thought about implementing a quick delete just so I could skip the db reset call but also realized that the tests I wrote for listing all games originally would fail as soon as the first game was added.

I considered if the stage this API is at was worth implementing zod right now as a priority and while I left several todo's relating to schemas and validation I ultimately decided it was better to implement other functionality first.

While in the return I left in the game cells in the responses, a first priority would be masking those in a sane way, such as class-transformer's `@Exclude()` decorator, or on the `find()` only get the status and id.

While I do really like working with prettier I've also been exploring an alternative to it called `biomejs`. I don't worry too much about code formatting standards so long as it's formatted, and that the formatting is checked in the pipeline.

An item I like for myself though it doesn't really matter in the grand scheme is a tool like pre-commit.com or even just a Makefile that is setup to run all the items we want checked in the pipeline as it relates to linting and formatting.
