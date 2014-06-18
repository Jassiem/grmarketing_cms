Grassroot::Application.routes.draw do
  get "message/create"
  get "message/get_message"
  get "message/get_messages"
  get "message/delete"
  get "newsletter/create"
  get "layout/index"

  get "partials/:partial", to: "partials#show_partial"
  #get "secured/:partial", to: "partials#show_secured"

  match "api/create-event", to: "event#create", via: [:post]
  match "api/get-events", to: "event#get_all_events", via: [:get]
  match "api/get-event", to: "event#get_event", via: [:get]
  match "api/delete-event", to: "event#delete", via: [:post]
  match "api/edit-event", to: "event#edit", via: [:post]

  match "api/create-petition", to: "petition#create", via: [:post]
  match "api/get-petitions", to: "petition#get_all_petitions", via: [:get]
  match "api/get-petition", to: "petition#get_petition", via: [:get]
  match "api/delete-petition", to: "petition#delete", via: [:post]
  match "api/edit-petition", to: "petition#edit", via: [:post]
  match "api/sign-petition", to: "petition#sign_petition", via: [:post]

  match "api/create-story", to: "story#create", via: [:post]
  match "api/get-stories", to: "story#get_all_stories", via: [:get]
  match "api/get-story", to: "story#get_story", via: [:get]
  match "api/delete-story", to: "story#delete", via: [:post]
  match "api/edit-story", to: "story#edit", via: [:post]

  match "api/create-device", to: "device#create", via: [:post]
  match "api/get-devices", to: "device#get_all_devices", via: [:get]

  match "api/create-message", to: "message#create", via: [:post]
  match "api/get-message", to: "message#get_message", via: [:get]
  match "api/get-messages", to: "message#get_messages", via: [:get]
  match "api/delete-message", to: "message#delete", via: [:post]
  match "api/edit-message", to: "message#edit", via: [:post]
  match "api/send-notification", to: "message#notify", via: [:post]

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
