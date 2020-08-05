# Usage

`yarn start` will start Expo.

# Api

Because of how https://jsonplaceholder.typicode.com fake api works,
the resource will not be really created on the server but it will be faked as if.
Since the server always returns the same id when you create a todo (it always returns 201),
you would not be able to create multiple todos for the tests.
I needed to find a workaround, that is why I created a new fake id for the new todos,
so you can try creating as many new todos as you want.
The problem with that is that you will not be able to edit a new todo without receiving an error from the api since
it tries to update a todo id not existing on the fake api.
I could have also kept the id 201 for all the new todos and used a react key with id+title but it would have been weird as well.
