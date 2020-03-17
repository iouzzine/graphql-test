const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const userCtrl = require('../controllers/user.controller');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    token: {
      type: GraphQLString
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        _id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return userCtrl.getOne(args._id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args, context) {
        return userCtrl.getMany();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: {
      type: UserType,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString)
        },
        password: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parentValue, args) {
        const body = {
          username: args.username,
          password: args.password
        };
        return userCtrl.login(body);
      }
    },
    addUser: {
      type: UserType,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString)
        },
        username: {
          type: new GraphQLNonNull(GraphQLString)
        },
        password: {
          type: new GraphQLNonNull(GraphQLString)
        },
        passwordConfirm: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parentValue, args) {
        const body = {
          email: args.email,
          username: args.username,
          password: args.password,
          passwordConfirm: args.passwordConfirm
        };
        return userCtrl.register(body);
      }
    },
    editUser: {
      type: UserType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        email: {
          type: GraphQLString
        },
        username: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        const body = {
          email: args.email,
          username: args.username
        };
        return userCtrl.edit(args._id, body);
      }
    },
    editPassword: {
      type: UserType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        oldPassword: {
          type: GraphQLString
        },
        newPassword: {
          type: GraphQLString
        },
        newPasswordConfirm: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        const body = {
          oldPassword: args.oldPassword,
          newPassword: args.newPassword,
          newPasswordConfirm: args.newPasswordConfirm
        };
        return userCtrl.editPwd(args._id, body);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
