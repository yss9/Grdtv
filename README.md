application.properties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/travien
spring.datasource.username=[mysql 이름 ex)root]
spring.datasource.password=[mysql 비밀번호]
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect


git config --global user.name "git 이름"
git config --global user.email "git 로그인 이메일"
git push --set-upstream origin main
git config --global push.default current
git config --global --add push.autoSetupRemote true
git push -u
git pull (작업 전)
git checkout -b 브랜치이름
---------브랜치 내 브랜치로 이동----------
git add .
git commit -m "커밋 메시지"
git push
git checkout main
-------브랜치 메인으로 이동------
git merge 브랜치이름 ()
git push
