# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    # pkgs.go
    # pkgs.python311
    # pkgs.python311Packages.pip
    # pkgs.nodejs_20
    # pkgs.nodePackages.nodemon
    pkgs.temurin-bin-17
    pkgs.spring-boot-cli
    pkgs.maven
    pkgs.typescript
    pkgs.google-chrome
  ];

  # Sets environment variables in the workspace
  env = { };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        # Preview for the frontend (Angular)
        petshop_web = {
          command = [ "npm" "start" ]; # Or "npm run dev" if you are using a dev server.
          cwd = "controle-atendimento-petshop-web"; # Directory where the frontend project is located
          manager = "web";
          env = {
            PORT = "4200";
          };
        };
        # Preview for the backend (Spring)
        petshop_service = {
          command = [ "./mvnw" "spring-boot:run" ]; # Assuming you are using maven. If gradle, use "./gradlew bootRun" instead
          cwd = "controle-atendimento-petshop-service"; # Directory where the backend project is located
          manager = "web"; # Consider changing to another manager if not web based
          env = {
            PORT = "8080";
          };
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        # npm-install = "npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Example: start a background task to watch and re-build backend code
        # watch-backend = "npm run watch-backend";
      };
    };
  };
}
