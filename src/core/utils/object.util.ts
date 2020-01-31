export function flatten(object: Record<string, any>, separator = '.') {
  return Object.assign({}, ...function _flatten(child: any, path: any = []): any {
    return [].concat(...Object.keys(child).map(key => typeof child[key] === 'object'
      ? _flatten(child[key], path.concat([key]))
      : ({ [path.concat([key]).join(separator)] : child[key] })
    ));
  }(object));
}
