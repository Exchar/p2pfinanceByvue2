//引入公共路由
export function getAsyncRoutes(routes) {
  const res = [];
  const keys = ["path", "name", "children"];
  if (Array.isArray(routes)) {
    routes.forEach(v => {
      const newItem = {};
      if (v.path) {
        //如果m没有children
        if (v.children && v.children.length > 0) {
          newItem.component = () => "";
        } else if (v.path === "/") {
          newItem.component = newItem.component = resolve => {
            require([`@/views${v.component}/index`], resolve);
          };
        } else {
          //如果不是，就替换
          newItem.component = resolve => {
            require([`@/views${v.path}/index`], resolve);
          };
        }
      }

      for (const key in v) {
        if (keys.includes(key)) {
          if (key === "name") {
            newItem["name"] = v["path"].split("/")[
              v["path"].split("/").length - 1
            ];
          } else {
            newItem[key] = v[key];
            newItem.meta = { title: v.title };
          }
          // } else {
          //   newItem["name"] = v["path"].split("/")[
          //     v["path"].split("/").length - 1
          //   ]+v.id;
          // }
        }
      }
      if (v.path) {
        if (
          (v.children == null || v.children.length === 0) &&
          v.path !== "/home"
        ) {
          newItem["name"] = v["path"].split("/")[
            v["path"].split("/").length - 1
          ];
        }
      }
      if (newItem.children && newItem.children.length) {
        newItem.children = getAsyncRoutes(v.children);
      }
      res.push(newItem);
    });
  }
  return res;
}
