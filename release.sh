set -e
echo "Enter release version: "
read VERSION
# -p 输出 "..." 中的文字
# -n 1 表示只有第一个字符有效
# -r 禁止反斜线
read -p "Release $VERSION - are you sure(y/n)" -n 1 -r
echo # 跳到新行
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # commit
  # git add .
  # git commit -m "[build] $VERSION"
  # npm version $VERSION --message "[release] $VERSION"
  # git push origin master

  # 发布的时候发布的是 dist 文件夹，见 package.json 的 files 字段
  # publish
  # npm publish

  echo "Release success!"
fi

