[![Coverage Status](https://coveralls.io/repos/github/Extremophile-ai/Shopify-image-repo/badge.svg?branch=main)](https://coveralls.io/github/Extremophile-ai/Shopify-image-repo?branch=main)

# This application allows a user to create, verify and login into an account. A logged in user can add, view and delete images they uploaded.

Follow the instructions below to test this Application

- Clone this repository and `cd` into `Shopify-image-repo`
- Install dependencies by runnng `npm install` in your terminal

# To interract with this application in a production environment, navigate to the following URL endpoints:

## To create a user account, make a POST request to
`https://shopify-imagify.herokuapp.com/user/signup`
- Add the following in the request body
```
{
  "username": "ShopifyUser", 
  "email": "myValidEmail@gmail.com", 
  "password": "myVerySecurePassword"
}
```

## To login into a user account after verification, make a POST request to
`https://shopify-imagify.herokuapp.com/user/login`
- Provide the following to enable you log in
```
{
  "email": "myValidEmail@gmail.com", 
  "password": "myVerySecurePassword"
}
```

## To update user profile details, make a PATCH request to 
`https://shopify-imagify.herokuapp.com/user/profile/update`
- Provide the following user profile data. User must be logged in to access this endpoint
```
{
  "firstName": "myFirstName",
  "lastName": "myLastName",
  "phoneNumber": "07012345678"
}
```

## To upload an image, make a PATCH request to 
`https://shopify-imagify.herokuapp.com/user/image/upload`
- Provide the following user profile data. User must be logged in to access this endpoint
```
{
    "title": "grocery_store",
    "image": "https://images.unsplash.com/photo-1515706886582-54c73c5eaf41?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8c2hvcHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
}
```
## To view an uploaded image, make a GET request to
`https://shopify-imagify.herokuapp.com/user/image/:title`
- Change the `<:title>` in the url above to the title of the image you want to view. 
- User must be logged in to access this endpoint

## To view all registered users, make a GET request to 
`https://shopify-imagify.herokuapp.com/users`

## To delete uploaded image, make a DELETE request to 
`https://shopify-imagify.herokuapp.com/user/image/:title/delete`
- Change the `<:title>` in the url above to the title of the image you want to delete. 
- User must be logged in to access this endpoint

## To delete a user account, make a DELETE request to
`https://shopify-imagify.herokuapp.com/user/delete`
- User must be logged in to access this endpoint
