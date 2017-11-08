import snakeCase from 'lodash.snakecase'

const constantCase = (str) => snakeCase(str).toUpperCase()

module.exports = babel => {
  var t = babel.types;
  return {
    name: "s2s-redux-actions",
    visitor: {
      ExpressionStatement: function(path){
        const ExpressionStatementName = path.node.expression.name
        const hoge = constantCase(ExpressionStatementName)
        path.replaceWith(
          t.ExportNamedDeclaration(
            t.VariableDeclaration(
              "const",
              [t.VariableDeclarator(
                t.identifier(ExpressionStatementName),
                t.CallExpression(
                  t.Identifier("createAction"),
                  [t.StringLiteral(hoge)]
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
