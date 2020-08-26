using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ReactAspx.Startup))]
namespace ReactAspx
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
