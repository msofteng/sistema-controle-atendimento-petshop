# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.temurin-bin-17
    pkgs.spring-boot-cli
    pkgs.maven
    pkgs.typescript
    pkgs.chromium
    pkgs.python313
    pkgs.npm-check-updates
  ];

  # Sets environment variables in the workspace
  env = {
    CHROME_BIN = "/usr/bin/chromium";
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "Angular.ng-template"
      "redhat.java"
      "vscjava.vscode-gradle"
      "vscjava.vscode-java-debug"
      "vscjava.vscode-java-dependency"
      "vscjava.vscode-java-pack"
      "vscjava.vscode-java-test"
      "vscjava.vscode-maven"
      "vscjava.vscode-spring-initializr"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        # Preview for the frontend (Angular)
        petshop_web = {
          command = [ "npm" "start" ];
          cwd = "controle-atendimento-petshop-web";
          manager = "web";
          env = {
            PORT = "4200";
          };
        };
        # Preview for the backend (Spring)
        petshop_service = {
          command = [ "./mvnw" "spring-boot:run" ];
          cwd = "controle-atendimento-petshop-service";
          manager = "web";
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
        # Install JS dependencies for the frontend
        "build-web" = "cd controle-atendimento-petshop-web && npm install && npm run build && ng test --no-watch --watch=false --code-coverage --browsers ChromeHeadless && exit";
        # Build the backend (Spring)
        "build-service" = "cd controle-atendimento-petshop-service && ./mvnw clean package && exit";
        # Update global packages
        "update-packages" = "npm install -g npm@latest && npm -g install @angular/cli@latest && exit";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Example: start a background task to watch and re-build backend code
        watch-unit-tests-angular = "cd /home/user/sistema-controle-atendimento-petshop/controle-atendimento-petshop-web/coverage && python3 -m http.server 3000 --bind 0.0.0.0";
        watch-unit-test-spring = "cd /home/user/sistema-controle-atendimento-petshop/controle-atendimento-petshop-service/target/site/jacoco && python3 -m http.server 5000 --bind 0.0.0.0";
      };
    };
  };
}