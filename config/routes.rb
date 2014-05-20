Grassroot::Application.routes.draw do
  get "layout/index"

  get "partials/:partial", to: "partials#show_partial"
  #get "secured/:partial", to: "partials#show_secured"
  match "api/test", to: "session#test", via: [:get]
  match "api/create-event", to: "event#create", via: [:post]
  match "api/get-events", to: "event#get_all_events", via: [:get]


  # API Routes

  # ===========================
  # Session Routes
  # ===========================
  # match "api/login", to: "session#login", via: [:post]
  # match "api/logout", to: "session#logout", via: [:get]
  # match "api/signup", to: "users#create", via: [:post]
  # match "api/logout", to: "session#logout", via: [:post]
  # # for angular page prefetch
  # match "api/loggedin", to: "session#loggedin", via: [:get]

  root "layout#index"
  # #resources :users

  # # if nothing else caught route--redirect
  # # this must stay at the bottom of all the routes
  get '*path' => redirect("/")
end
