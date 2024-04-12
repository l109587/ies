import LoginLayout from './LoginLayout';
import PrimaryLayout from './PrimaryLayout';

export default function (props) {
  const { children, location } = props;

  const layouts = [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/(\/(en|zh))*\/tip|login/],
    },
  ];

  const LayoutMap = {
    primary: PrimaryLayout,
    public: LoginLayout,
  };
  const queryLayout = (layouts, pathname) => {
    let result = 'public';
    const isMatch = (regepx) => {
      return regepx instanceof RegExp
        ? regepx.test(pathname)
        : pathToRegexp(regepx).exec(pathname);
    };

    for (const item of layouts) {
      let include = false;
      let exclude = false;
      if (item.include) {
        for (const regepx of item.include) {
          if (isMatch(regepx)) {
            include = true;
            break;
          }
        }
      }

      if (include && item.exclude) {
        for (const regepx of item.exclude) {
          if (isMatch(regepx)) {
            exclude = true;
            break;
          }
        }
      }

      if (include && !exclude) {
        result = item.name;
        break;
      }
    }
    return result;
  };
  const Container = LayoutMap[queryLayout(layouts, location.pathname)];
  return <Container>{children}</Container>;
}
