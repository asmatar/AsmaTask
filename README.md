# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Routes

# board page ( cf board full page)

- si pas de board alors on met un message disant qu'il n'y a pas de board
- si y'a un board on le display
- on doit voir le nom du board
- le timestamps
- un btn pour aller sur la page du board

- BACKEND DANS FIREBASE
  => le board doit avoir le nom de l'auteur du board
  => le timestamps de creation du board
  => le nom du board

# board id (cf board sonny.png)

- un header avec un bouton pour retour en arriere
- un imput pour modifier le nom du board
- 3 columns avec a faire, en cours, done
  => les column doivent pouvoir se drag and drop
  => on doit voir le nombre de task dans une column
  => chaque column dit avoir un btn pour add a new task

# add task modal ( cf modal sonny task)

- la modal doit avoir input avec le nom de la tache
- la modal doit pouvoir changer le status de la nouvelle tache
- la modal doit avoir un btn pour add la task

# modal task (cf modal inside-task)

- quand click sur une task on doit pouvoir l'ouvrir
- btn pour rename la card
- on doit voir dans quelle category est la card
- add a description
- une section activite on a le nom du user qui a creer la card + son nom + timestamps
- quand on change la description et qu'on save on doit update la partie de activity avec le les infos precedentes

### GENERAL

# SYSTEM DE NOTIFICATION

- a chaque fois qu'on drag and drop
- quand on arrive sur la page home et que le login est un succes
- si on rename le board
- si on ajoute une activite a une task

# Spiner

- faire le composant de loading avec un spiner

# composant de error boundary

# System de drag and drop entre column

# System de drag and drop dans une meme column entre les task

# System de drag and drop d'une task entre differentes column

# login page and register

- react hook form pour check le formulaire de register ou de login
- si le client vient de se registrer quand on arrive sur le login on doit voir aparaitre son email et son password avec des \*\* (seulement si le mec viens de se regitrer)

# quand drag and drop on doit detecter dans quel section on a mis la card

### table

# board

- nom du board
- nombre de task
- timestamps de la date de creation

# task

- nom
- description
- author
- category (a faire, en cour, done) cette category doit etre update su on drag and drop la card
- timestamps
- activity (array qui va donner l'historique des modif de la card => )
  => si on creer la card on aura dans activity: author, created card "nom" et le timestamps
  => si modif la task par exemple le nom on aure : author updated card "nom de la carte"
