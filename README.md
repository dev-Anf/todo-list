  -- Todo List App --

My first full-stack project. Started as just HTML/CSS/JS, now it actually talks to a real backend and saves tasks to a database instead of losing everything on refresh.

  What it does

Add tasks, check them off, delete them. Nothing fancy — the point was to finally connect the pieces I'd learned separately (HTML/CSS, C#, SQL) and get them working together as one app

Stack
Frontend: HTML, CSS, vanilla JS (just fetch, no frameworks)
Backend: ASP.NET Core Web API
Database: SQL Server, via Entity Framework Core
API
Method	Route	What it does
GET	/api/todo	get all tasks
GET	/api/todo/{id}	get one task
POST	/api/todo	create a task
PATCH	/api/todo/{id}	update done/not done
DELETE	/api/todo/{id}	delete a task
Running it locally

You'll need the .NET SDK and a local SQL Server instance.

```bash cd backend dotnet ef database update dotnet run ```

That starts the API on `http://localhost:5250\`. Then just open `index.html` in a browser — no build step, it's plain JS. Backend has to be running first or you'll get connection errors in the console.

Notes

Everything runs locally right now — the frontend is hardcoded to talk to localhost, and there's no live deployment yet. Might set that up later (would need to host the backend and DB somewhere and swap the API URL).

This was mainly a "make it actually work end to end" project, so the code isn't perfectly clean everywhere — still learning.
