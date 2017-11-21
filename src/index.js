import snakeCase from 'lodash.snakecase'

const constantCase = (str) => snakeCase(str).toUpperCase()

module.exports = babel => {
  var t = babel.types;
  return {
    name: "s2s-redux-actions",
    visitor: {
      Program: {
        enter(path, state) {
          const { autocomplete } = state.opts
          if(autocomplete == undefined || autocomplete == true){
            path.traverse({
              ExpressionStatement(path){
                const ExpressionStatementName = path.node.expression.name
                if (ExpressionStatementName.endsWith('Request')) {
                  const program = path.find(parent => parent.isProgram())
                  program.node.body.push(
                    t.ExpressionStatement(
                      t.identifier(
                        ExpressionStatementName.replace(/Request$/, 'Success')
                      )
                    ),
                    t.ExpressionStatement(
                      t.identifier(
                        ExpressionStatementName.replace(/Request$/, 'Failure')
                      )
                    )
                  )
                }
              }
            })
          }
        }
      },
      ExpressionStatement: function(path){
        const ExpressionStatementName = path.node.expression.name
        const SnakeExpressionStatementName = constantCase(ExpressionStatementName)
        path.replaceWith(
          t.ExportNamedDeclaration(
            t.VariableDeclaration(
              "const",
              [t.VariableDeclarator(
                t.identifier(ExpressionStatementName),
                t.CallExpression(
                  t.Identifier("createAction"),
                  [t.StringLiteral(SnakeExpressionStatementName)]
                )
              )]
            )
            ,[]
          )
        )
      }
    }
  }
}
